import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserInput } from './create-user.input';

export class UpdateUserInput extends PartialType(CreateUserInput) {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  profile_picture?: string | null;
}
