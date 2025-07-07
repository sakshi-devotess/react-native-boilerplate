import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ApiBasicAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@ApiBasicAuth()
@Controller('user')
export class UserController {
  /**
   * Constructor to inject the UserService.
   *
   * @param UserService - Service to handle the business logic.
   */
  constructor(private readonly userService: UserService) {}

  /**
   * Creates a new User entry.
   *
   * @param {CreateUserInput} createUserInput - The input data for creating the entity.
   * @returns {Promise<any>} - The newly created entity.
   */
  @ApiBody({ type: CreateUserInput })
  @Post()
  create(@Body() createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @ApiBody({ type: UpdateUserInput })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserInput: UpdateUserInput) {
    return this.userService.update(id, updateUserInput);
  }
}
