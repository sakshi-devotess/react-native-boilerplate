import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateCompanyTypeInput {
  @ApiProperty()
  @MaxLength(64)
  name: string | null;

  @ApiProperty()
  type: number | null;

  @ApiPropertyOptional()
  active: boolean | null;
}
