import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateCompanyInput {
  @ApiProperty()
  @MaxLength(64)
  name: string | null;

  @ApiProperty()
  @MaxLength(64)
  reference: string | null;

  @ApiPropertyOptional()
  active: boolean | null;

  @ApiProperty()
  created_by_company_has_user_id: number | null;

  @ApiProperty()
  company_type_id: number;

  @ApiPropertyOptional()
  logo_file_id: number | null;
}
