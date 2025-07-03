import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  // Define your user-related endpoints here
  // For example:
  @Get()
  findAll() {
    return 'This action returns all users';
  }
}
