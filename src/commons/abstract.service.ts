import { BadRequestException, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export abstract class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  /**
   * Fetches multiple records based on provided options.
   *
   * This function is generally used to retrieve multiple
   * records from the repository that match given criteria.
   *
   * @param {FindManyOptions} options - Criteria and conditions for fetching records.
   * @returns {Promise<any[]>} - Returns a promise with an array of matching records.
   */
  async find(options: FindManyOptions): Promise<any[]> {
    if (!options.order) {
      options.order = {
        id: 'DESC',
      };
    }
    return await this.repository.find(options);
  }

  /**
   * Fetches a single record based on provided options.
   *
   * This function returns a single record from the repository, if found, based on
   * criteria specified in `FindOneOptions`. It is primarily used when fetching
   * specific records by unique identifiers.
   *
   * @param {FindOneOptions} options - Conditions for fetching the record.
   * @returns {Promise<any>} - Returns a promise with the found record, if any.
   */
  async findOne(options: FindOneOptions): Promise<any> {
    const data = await this.repository.findOne(options);
    return data;
  }

  async abstractUpdate(id: number, data: any): Promise<any> {
    const entity = await this.repository.preload(data);
    if (!entity) return false;
    const errors = await validate(entity);
    if (errors.length > 0) {
      const error = errors.map((errorItem) => {
        return {
          target: errorItem.target.constructor.name,
          error: {
            [errorItem.property]: Object.values(errorItem.constraints).join(
              ' ',
            ),
          },
        };
      });
      throw new BadRequestException(error);
    }
    const res = await this.repository.update(id, data);
    if (res && res.affected > 0) {
      return await this.findOne({ where: { id } });
    } else {
      return false;
    }
  }
}
