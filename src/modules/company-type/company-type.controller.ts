import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyTypeService } from './company-type.service';
import { CreateCompanyTypeInput } from './dto/create-company-type.input';
import { UpdateCompanyTypeInput } from './dto/update-company-type.input';
import { ApiBasicAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('company_type')
@ApiBasicAuth()
@Controller('company_type')
export class CompanyTypeController {
  /**
   * Constructor to inject the CompanyTypeService.
   *
   * @param CompanyTypeService - Service to handle the business logic.
   */
  constructor(private readonly companyTypeService: CompanyTypeService) {}

  /**
   * Creates a new CompanyType entry.
   *
   * @param {CreateCompanyTypeInput} createCompanyTypeInput - The input data for creating the entity.
   * @returns {Promise<any>} - The newly created entity.
   */
  @ApiBody({ type: CreateCompanyTypeInput })
  @Post()
  create(@Body() createCompanyTypeInput: CreateCompanyTypeInput) {
    return this.companyTypeService.create(createCompanyTypeInput);
  }

  /**
   * Updates an existing CompanyType entry by ID.
   *
   * @param {string} id - The ID of the CompanyType to update.
   * @param {UpdateCompanyTypeInput} updateCompanyTypeInput - The updated data.
   * @returns {Promise<any>} - The updated entity or a failure response.
   */
  @ApiBody({ type: UpdateCompanyTypeInput })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCompanyTypeInput: UpdateCompanyTypeInput,
  ) {
    return this.companyTypeService.update(id, updateCompanyTypeInput);
  }
}
