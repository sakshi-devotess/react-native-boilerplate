import { Injectable } from '@nestjs/common';
import { fileRepository } from './repository/file.repository';
import { File } from './entities/file.entity';
import { CreateFileInput } from './dto/create-file.input';

@Injectable()
export class FileService {
  /**
   * Constructor for FileService.
   * Injects dependencies and initializes the abstract service with the file repository.
   *
   * @param {ResponseMsgService} responseMsgService - Service to handle response messages.
   */
  constructor() {}

  /**
   * Creates a new File entry in the database.
   *
   * This function takes input data for creating a new File entity and optionally includes related entities in the response.
   * It returns a Promise that resolves to the created File entity or false if the operation fails.
   *
   * @param {CreateFileInput} data - Input data for creating the File.
   * @param {string[]} [relations=null] - Optional array of related entities to include in the response.
   * @returns {Promise<File | boolean>} - The created entity or false if the operation fails.
   */
  async create(data: CreateFileInput): Promise<File | boolean> {
    const create = fileRepository.create(data);
    return create;
  }
}
