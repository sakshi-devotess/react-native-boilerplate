import { Injectable } from '@nestjs/common';
import { companyRepository } from './repository/company.repository';
import { Company } from './entities/company.entity';
import { CreateCompanyInput } from './dto/create-company.input';

@Injectable()
export class CompanyService {
  /**
   * Constructor for CompanyService.
   * Injects dependencies and initializes the abstract service with the company repository.
   */
  constructor() {}

  /**
   * Creates a new Company entry in the database.
   *
   * This function takes input data for creating a new Company entity and optionally includes related entities in the response.
   * It returns a Promise that resolves to the created Company entity or false if the operation fails.
   *
   * @param {CreateCompanyInput} data - Input data for creating the Company.
   * @param {string[]} [relations=null] - Optional array of related entities to include in the response.
   * @returns {Promise<Company | boolean>} - The created entity or false if the operation fails.
   */
  async create(data: CreateCompanyInput): Promise<Company> {
    return companyRepository.create(data);
  }
}
