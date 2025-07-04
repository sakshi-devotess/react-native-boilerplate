import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';
import { ApiBasicAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('file')
@ApiBasicAuth()
@Controller('file')
export class FileController {
  /**
   * Constructor to inject the FileService.
   *
   * @param FileService - Service to handle the business logic.
   */
  constructor(private readonly fileService: FileService) {}

  /**
   * Creates a new File entry.
   *
   * @param {CreateFileInput} createFileInput - The input data for creating the entity.
   * @returns {Promise<any>} - The newly created entity.
   */
  @ApiBody({ type: CreateFileInput })
  @Post()
  create(@Body() createFileInput: CreateFileInput) {
    return this.fileService.create(createFileInput);
  }
}
