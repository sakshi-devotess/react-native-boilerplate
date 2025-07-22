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
      const fileId = await this.handleProfilePictureUpload(
        file,
        userData.file_id,
      );
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

  /**
   * Handles the processing and storage of a new profile picture file.
   *
   * This includes:
   * - Generating a DB record for the file
   * - Renaming the uploaded file
   * - Deleting any previous profile picture for the user
   * - Updating the DB file record with the new path and name
   *
   * @param {Express.Multer.File} file - The uploaded file.
   * @param {number | null} previousFileId - The previous file ID to clean up, if any.
   * @returns {Promise<number>} - The ID of the new file.
   */
  private async handleProfilePictureUpload(
    file: Express.Multer.File,
    previousFileId?: number,
  ): Promise<number> {
    const uploadDir = path.resolve(__dirname, '../../../file/profile-pictures');
    const userFilename = path.basename(file.path);
    const userFilePath = path.join(uploadDir, userFilename);
    const ext = path.extname(file.originalname);

    // Step 1: Create DB entry for new file
    const fileData = await this.fileService.create({
      path: '',
      original_name: file.originalname,
    });

    const fileId = fileData.id;
    const finalFilename = `${fileId}${ext}`;
    const finalFilePath = path.join(uploadDir, finalFilename);

    // Step 2: Remove old files if any
    if (previousFileId) {
      const existing = fs
        .readdirSync(uploadDir)
        .filter((f) => f.startsWith(`${previousFileId}.`));
      for (const f of existing) {
        fs.unlinkSync(path.join(uploadDir, f));
      }
    }

    // Step 3: Rename uploaded file
    fs.renameSync(userFilePath, finalFilePath);

    // Step 4: Update DB record with final file path
    await this.fileService.update(fileId, {
      id: fileId,
      path: finalFilePath,
      original_name: finalFilename,
    });

    return fileId;
  }
}
