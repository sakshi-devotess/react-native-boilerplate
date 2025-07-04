import { User } from '../entities/user.entity';
import { dataSource } from '../../../core/data-source';

export const userRepository = dataSource.getRepository(User);
