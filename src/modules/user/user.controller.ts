import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrentUserDto } from 'src/core/guards/current-user.dto';
import { CurrentUser } from 'src/commons/decorator/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';

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
  @Patch('my-profile')
  @UseInterceptors(
    FileInterceptor('profile_picture', {
      storage: diskStorage({
        destination: './file/profile-pictures',
        filename: (req: any, file, callback) => {
          const userId = req?.user?.user_id;
          const ext = extname(file?.originalname);
          callback(null, `user-${userId}${ext}`);
        },
      }),
    }),
  )
  async updateMyProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: CurrentUserDto,
    @Res() res: Response,
  ) {
    const id = currentUser.user_id;
    const result = await this.userService.update(id, updateUserInput, file);
    return baseController.getResult(
      res,
      200,
      result,
      'Profile updated successfully.',
    );
  }
}
