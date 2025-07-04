import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateUserInput {
  @ApiProperty()
  created_by_company_has_user_id?: number | null;

  @ApiPropertyOptional()
  @MaxLength(64)
  first_name?: string | null;

  @ApiPropertyOptional()
  @MaxLength(64)
  last_name?: string | null;

  @ApiProperty()
  mpin?: string | null;

  @ApiPropertyOptional()
  active?: boolean | null;

  @ApiPropertyOptional()
  file_id?: number | null;

  @ApiPropertyOptional()
  @MaxLength(64)
  email?: string | null;

  @ApiProperty()
  @MaxLength(64)
  mobile: string;
}
