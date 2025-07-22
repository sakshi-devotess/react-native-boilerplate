import { Injectable } from '@nestjs/common';
import { CompanyType } from './entities/company-type.entity';
import { CreateCompanyTypeInput } from './dto/create-company-type.input';
import { UpdateCompanyTypeInput } from './dto/update-company-type.input';
import { companyTypeRepository } from './repository/company-type.repository';

@Injectable()
export class CompanyTypeService {
  /**
   * Constructor for CompanyTypeService.
   * Injects dependencies and initializes the abstract service with the companyType repository.
   *
   * @param {ResponseMsgService} responseMsgService - Service to handle response messages.
   */
  constructor() {}

  /**
   * Creates a new CompanyType entry in the database.
   *
   * This function takes input data for creating a new CompanyType entity and optionally includes related entities in the response.
   * It returns a Promise that resolves to the created CompanyType entity or false if the operation fails.
   *
   * @param {CreateCompanyTypeInput} data - Input data for creating the CompanyType.
   * @param {string[]} [relations=null] - Optional array of related entities to include in the response.
   * @returns {Promise<CompanyType | boolean>} - The created entity or false if the operation fails.
   */
  async create(data: CreateCompanyTypeInput): Promise<CompanyType | boolean> {
    const create = companyTypeRepository.create(data);
    return create;
  }

  /**
   * Updates an existing CompanyType entry by ID.
   *
   * This function takes the ID of an existing CompanyType entity and updated data, and optionally includes related entities in the response.
   * It returns a Promise that resolves to the updated CompanyType entity or false if the operation fails.
   *
   * @param {number} id - The ID of the CompanyType to update.
   * @param {UpdateCompanyTypeInput} data - Updated data for the CompanyType.
   * @param {string[]} [relations=null] - Optional array of related entities to include in the response.
   * @returns {Promise<CompanyType | boolean>} - The updated entity or false if the update fails.
   */
  async update(
    id: number,
    data: UpdateCompanyTypeInput,
  ): Promise<CompanyType | boolean> {
    await companyTypeRepository.update(id, data);
    const updatedEntity = await companyTypeRepository.findOne({
      where: { id },
    });
    return updatedEntity || false;
  }
}
