import { File } from '../entities/file.entity';
import { dataSource } from '../../../core/data-source';

export const fileRepository = dataSource.getRepository(File);
