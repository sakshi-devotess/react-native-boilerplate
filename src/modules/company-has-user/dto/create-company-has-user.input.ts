import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyHasUserInput {
  @ApiProperty()
  created_by_company_has_user_id: number | null;

  @ApiProperty()
  company_id: number;

  @ApiProperty()
  user_id: number;

  @ApiPropertyOptional()
  active: boolean | null;
}
