import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { FileService } from './file.service';
import { SkipAuth } from 'src/core/guards/auth-guard';
import * as fs from 'fs';
import * as path from 'path';
@ApiTags('file')
@ApiBearerAuth()
@Controller('file')
@SkipAuth()
export class FileController {
  constructor(private fileService: FileService) {}

  @SkipAuth()
  @Get('get-image/:id')
  async getImage(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    const protocol = request.protocol;
    const host = request.get('host');
    const hostURL = `${protocol}://${host}`;
    const url = await this.fileService.getFile(+id, hostURL);

    if (!url) {
      return;
    }
    res.send(url);
  }

  @SkipAuth()
  @Get(':id')
  async getFileById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const file = await this.fileService.getFileById(+id);
    if (!file) {
      throw new NotFoundException('File not found');
    }

    const imagePath = path.join(
      __dirname,
      '../../../file/profile-pictures',
      file.original_name,
    );

    if (!fs.existsSync(imagePath)) {
      throw new NotFoundException('Image not found');
    }
    const fileBuffer = fs.readFileSync(imagePath);
    const base64Data = fileBuffer.toString('base64');
    const stream = this.fileService.base64ToStream(base64Data);

    return new StreamableFile(stream);
  }
}
