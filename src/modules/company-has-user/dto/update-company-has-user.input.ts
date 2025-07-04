import { ApiProperty } from '@nestjs/swagger';
import { CreateCompanyHasUserInput } from './create-company-has-user.input';

export class UpdateCompanyHasUserInput extends CreateCompanyHasUserInput {
  @ApiProperty()
  id: number;
}
