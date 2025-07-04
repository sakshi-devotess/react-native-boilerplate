import { ApiProperty } from '@nestjs/swagger';
import { CreateCompanyInput } from './create-company.input';

export class UpdateCompanyInput extends CreateCompanyInput {
  @ApiProperty()
  id: number;
}
