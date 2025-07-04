import { ApiProperty } from '@nestjs/swagger';
import { CreateFileInput } from './create-file.input';

export class UpdateFileInput extends CreateFileInput {
  @ApiProperty()
  id: number;
}
