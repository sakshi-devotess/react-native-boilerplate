import { Injectable } from '@nestjs/common';
import { companyHasUserRepository } from './repository/company-has-user.repository';
import { CompanyHasUser } from './entities/company-has-user.entity';
import { CreateCompanyHasUserInput } from './dto/create-company-has-user.input';
import { UpdateCompanyHasUserInput } from './dto/update-company-has-user.input';
import { RemoveDto } from 'src/commons/dto/remove.dto';

@Injectable()
export class CompanyHasUserService {
  /**
   * Constructor for CompanyHasUserService.
   * Injects dependencies and initializes the abstract service with the companyHasUser repository.
   *
   * @param {ResponseMsgService} responseMsgService - Service to handle response messages.
   */
  constructor() {}

  /**
   * Creates a new CompanyHasUser entry in the database.
   *
   * This function takes input data for creating a new CompanyHasUser entity and optionally includes related entities in the response.
   * It returns a Promise that resolves to the created CompanyHasUser entity or false if the operation fails.
   *
   * @param {CreateCompanyHasUserInput} data - Input data for creating the CompanyHasUser.
   * @param {string[]} [relations=null] - Optional array of related entities to include in the response.
   * @returns {Promise<CompanyHasUser | boolean>} - The created entity or false if the operation fails.
   */
  async create(
    data: CreateCompanyHasUserInput,
  ): Promise<CompanyHasUser | boolean> {
    const create = companyHasUserRepository.create(data);
    return create;
  }

  /**
   * Updates an existing CompanyHasUser entry by ID.
   *
   * This function takes the ID of an existing CompanyHasUser entity and updated data, and optionally includes related entities in the response.
   * It returns a Promise that resolves to the updated CompanyHasUser entity or false if the operation fails.
   *
   * @param {number} id - The ID of the CompanyHasUser to update.
   * @param {UpdateCompanyHasUserInput} data - Updated data for the CompanyHasUser.
   * @param {string[]} [relations=null] - Optional array of related entities to include in the response.
   * @returns {Promise<CompanyHasUser | boolean>} - The updated entity or false if the update fails.
   */
  async update(
    id: number,
    data: UpdateCompanyHasUserInput,
  ): Promise<CompanyHasUser | boolean> {
    await companyHasUserRepository.update(id, data);
    const updatedEntity = await companyHasUserRepository.findOne({
      where: { id },
    });
    if (updatedEntity) {
      return updatedEntity;
    }
    return false;
  }

  /**
   * Removes a CompanyHasUser entry by ID.
   *
   * This function takes the ID of an existing CompanyHasUser entity and removes it from the database.
   * It returns a Promise that resolves to a RemoveDto indicating the result of the removal or false if the operation fails.
   *
   * @param {number} id - The ID of the CompanyHasUser to remove.
   * @returns {Promise<RemoveDto | boolean>} - A DTO indicating the result of the removal or false if the operation fails.
   */
  async remove(id: number): Promise<RemoveDto | boolean> {
    const result = await companyHasUserRepository.delete(id);
    if (result && result.affected && result.affected > 0) {
      return { affected: result.affected, id } as RemoveDto;
    }
    return false;
  }
}
