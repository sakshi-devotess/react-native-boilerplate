import { Controller, Post, Body } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyInput } from './dto/create-company.input';
import { ApiBasicAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('company')
@ApiBasicAuth()
@Controller('company')
export class CompanyController {
  /**
   * Constructor to inject the CompanyService.
   *
   * @param CompanyService - Service to handle the business logic.
   */
  constructor(private readonly companyService: CompanyService) {}

  /**
   * Creates a new Company entry.
   *
   * @param {CreateCompanyInput} createCompanyInput - The input data for creating the entity.
   * @returns {Promise<any>} - The newly created entity.
   */
  @ApiBody({ type: CreateCompanyInput })
  @Post()
  create(@Body() createCompanyInput: CreateCompanyInput) {
    return this.companyService.create(createCompanyInput);
  }
}
