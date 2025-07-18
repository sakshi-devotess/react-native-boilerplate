import { Injectable, NotFoundException } from '@nestjs/common';
import { userRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AbstractService } from 'src/commons/abstract.service';
import { FileService } from '../file/file.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService extends AbstractService {
  /**
   * Constructor for UserService.
   * Injects dependencies and initializes the abstract service with the user repository.
   *
   * @param {ResponseMsgService} responseMsgService - Service to handle response messages.
   */
  constructor(protected readonly fileService: FileService) {
    super(userRepository);
  }

  /**
   * Creates a new User entry in the database.
   *
   * This function takes input data for creating a new User entity and optionally includes related entities in the response.
   * It returns a Promise that resolves to the created User entity or false if the operation fails.
   *
   * @param {CreateUserInput} data - Input data for creating the User.
   * @param {string[]} [relations=null] - Optional array of related entities to include in the response.
   * @returns {Promise<User | boolean>} - The created entity or false if the operation fails.
   */
  async create(data: CreateUserInput): Promise<User> {
    const userData = await userRepository.find({
      where: { mobile: data.mobile },
    });
    if (userData.length > 0) {
      return userData[0];
    }
    const create = this.abstractCreate(data);
    return create;
  }

  async update(
    id: number,
    data: UpdateUserInput,
    file: Express.Multer.File = null,
  ) {
    const userData = await userRepository.findOne({ where: { id } });
    if (!userData) {
      throw new NotFoundException('User with this ID does not exist.');
    }
    if (file) {
      const uploadDir = path.resolve(
        __dirname,
        '../../../file/profile-pictures',
      );
      const userFilename = path.basename(file.path);
      const userFilePath = path.join(uploadDir, userFilename);
      const ext = path.extname(file.originalname);

      const fileData = await this.fileService.create({
        path: '',
        original_name: file.originalname,
      });

      const fileId = fileData.id;
      const finalFilename = `${fileId}${ext}`;
      const finalFilePath = path.join(uploadDir, finalFilename);

      const existing = fs
        .readdirSync(uploadDir)
        .filter((f) => f.startsWith(`${userData?.file_id}.`));
      for (const f of existing) {
        fs.unlinkSync(path.join(uploadDir, f));
      }

      fs.renameSync(userFilePath, finalFilePath);

      await this.fileService.update(fileId, {
        id: fileId,
        path: finalFilePath,
        original_name: finalFilename,
      });

      data.file_id = fileId;
    }
    delete data.profile_picture;
    const updateData = {
      ...data,
      id: userData.id,
    };
    const updateResult = await this.abstractUpdate(id, updateData);

    return updateResult;
  }
}
