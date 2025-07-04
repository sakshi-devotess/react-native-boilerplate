import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateFileInput {
  @ApiProperty()
  path: string | null;

  @ApiProperty()
  @MaxLength(256)
  original_name: string | null;
}
