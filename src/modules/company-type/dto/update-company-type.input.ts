import { ApiProperty } from '@nestjs/swagger';
import { CreateCompanyTypeInput } from './create-company-type.input';

export class UpdateCompanyTypeInput extends CreateCompanyTypeInput {
  @ApiProperty()
  id: number;
}
