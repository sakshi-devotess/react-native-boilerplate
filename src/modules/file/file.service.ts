import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateFileInput } from './dto/update-file.input';
import { CreateFileInput } from './dto/create-file.input';
import { File } from './entities/file.entity';
import { AbstractService } from 'src/commons/abstract.service';
import { fileRepository } from './repository/file.repository';
import { Readable } from 'stream';

@Injectable()
export class FileService extends AbstractService {
  constructor() {
    super(fileRepository);
  }

  /**
   * Creates a new file record.
   * @param {CreateFileInput} data - Data for creating a new file.
   * @param {string[]} [relations=null] - Relations to include in the query.
   * @returns {Promise<File>} The created file entity.
   */
  async create(data: CreateFileInput): Promise<File> {
    const create = this.abstractCreate(data);
    return create;
  }

  /**
   * Updates an existing file record.
   * @param {number} id - The ID of the file to update.
   * @param {UpdateFileInput} data - Data for updating the file.
   * @param {string[]} [relations=null] - Relations to include in the query.
   * @returns {Promise<File | boolean>} The updated file entity or false if update failed.
   */
  async update(id: number, data: UpdateFileInput): Promise<File | boolean> {
    const update = this.abstractUpdate(id, data);
    return update;
  }

  async getFile(fileId: number, hostURL: string): Promise<string | boolean> {
    const fileData: File = await this.findOne({ where: { id: fileId } });
    if (!fileData) {
      throw new BadRequestException('File not found');
    }
    return hostURL + '/file/' + fileData.id;
  }

  async getFileById(fileId: number) {
    try {
      const fileData: File = await this.findOne({ where: { id: fileId } });

      return fileData;
    } catch (e) {
      console.error('getFileById', e);
      return null;
    }
  }
  base64ToStream(base64String: string) {
    // Decode base64 string to buffer
    const buffer = Buffer.from(base64String, 'base64');
    // Create a readable stream from the buffer
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Indicates the end of the stream
    return stream;
  }
}
