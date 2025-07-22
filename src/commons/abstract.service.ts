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

  /**
   * Creates a new entity and validates it before saving to the repository.
   *
   * This method creates an instance of the entity from the provided data, runs
   * validation using `class-validator`, and saves it if valid. If validation fails,
   * a `BadRequestException` is thrown with details.
   *
   * @param {any} data - The data to create the entity from.
   * @returns {Promise<any>} - Returns the newly created entity or `false` if save fails.
   * @throws {BadRequestException} - If validation fails.
   */
  async abstractCreate(data: any): Promise<any> {
    const entity = this.repository.create(data);
    const errors = await validate(entity);
    if (errors.length > 0) {
      const error = errors.map((e) => {
        return {
          target: e.target.constructor.name,
          error: {
            [e.property]: Object.values(e.constraints).join(' '),
          },
        };
      });

      throw new BadRequestException(error);
    }

    const res = await this.repository.save(entity);
    if (res && res.id) {
      return await this.findOne({
        where: { id: res.id },
      });
    } else {
      return false;
    }
  }

  /**
   * Updates an existing entity by ID and validates the updated data.
   *
   * This method attempts to preload the entity using the provided data and ID.
   * It validates the entity before performing the update. If validation fails,
   * a `BadRequestException` is thrown. If the update is successful, the updated
   * entity is fetched and returned.
   *
   * @param {number} id - The ID of the entity to update.
   * @param {any} data - The updated data to apply to the entity.
   * @returns {Promise<any>} - The updated entity or `false` if update fails.
   * @throws {BadRequestException} - If validation fails.
   */
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
