import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrentUserDto } from 'src/core/guards/current-user.dto';
import { CurrentUser } from 'src/commons/decorator/current-user.decorator';

@ApiTags('user')
@ApiBasicAuth()
@ApiBearerAuth()
@Controller('user')
export class UserController {
  /**
   * Constructor to inject the UserService.
   *
   * @param UserService - Service to handle the business logic.
   */
  constructor(private readonly userService: UserService) {}
  /**
   * Retrieves a specific User entry by ID.
   *
   * @param {string} id - The ID of the User to retrieve.
   * @returns {Promise<any>} - The entity with the specified ID.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne({ where: { id } });
  }
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

  @ApiBody({ type: UpdateUserInput })
  @Patch('my-profile')
  updateMyProfile(
    @Body() updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    const id = currentUser.user_id;
    return this.userService.update(id, updateUserInput);
  }
}
