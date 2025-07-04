import { ApiProperty } from '@nestjs/swagger';
import { CreateUserInput } from './create-user.input';

export class UpdateUserInput extends CreateUserInput {
  @ApiProperty()
  id: number;
}
