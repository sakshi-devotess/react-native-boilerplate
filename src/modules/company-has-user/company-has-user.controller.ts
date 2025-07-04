import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyHasUserService } from './company-has-user.service';
import { CreateCompanyHasUserInput } from './dto/create-company-has-user.input';
import { UpdateCompanyHasUserInput } from './dto/update-company-has-user.input';
import { ApiBasicAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('company_has_user')
@ApiBasicAuth()
@Controller('company_has_user')
export class CompanyHasUserController {
  /**
   * Constructor to inject the CompanyHasUserService.
   *
   * @param CompanyHasUserService - Service to handle the business logic.
   */
  constructor(private readonly companyHasUserService: CompanyHasUserService) {}

  /**
   * Creates a new CompanyHasUser entry.
   *
   * @param {CreateCompanyHasUserInput} createCompanyHasUserInput - The input data for creating the entity.
   * @returns {Promise<any>} - The newly created entity.
   */
  @ApiBody({ type: CreateCompanyHasUserInput })
  @Post()
  create(@Body() createCompanyHasUserInput: CreateCompanyHasUserInput) {
    return this.companyHasUserService.create(createCompanyHasUserInput);
  }

  /**
   * Updates an existing CompanyHasUser entry by ID.
   *
   * @param {string} id - The ID of the CompanyHasUser to update.
   * @param {UpdateCompanyHasUserInput} updateCompanyHasUserInput - The updated data.
   * @returns {Promise<any>} - The updated entity or a failure response.
   */
  @ApiBody({ type: UpdateCompanyHasUserInput })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCompanyHasUserInput: UpdateCompanyHasUserInput,
  ) {
    return this.companyHasUserService.update(id, updateCompanyHasUserInput);
  }

  /**
   * Deletes a CompanyHasUser entry by ID.
   *
   * @param {string} id - The ID of the CompanyHasUser to delete.
   * @returns {Promise<any>} - A success or failure response for the deletion.
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.companyHasUserService.remove(id);
  }
}
