import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserInput } from './create-user.input';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserInput extends PartialType(CreateUserInput) {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  profile_picture?: string | null;

  @ApiProperty()
  @IsNotEmpty()
  first_name?: string | null;

  @ApiProperty()
  @IsNotEmpty()
  last_name?: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email?: string | null;
}
