import { Injectable } from '@nestjs/common';
import { userRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { RemoveDto } from '../../commons/dto/remove.dto';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  /**
   * Constructor for UserService.
   * Injects dependencies and initializes the abstract service with the user repository.
   *
   * @param {ResponseMsgService} responseMsgService - Service to handle response messages.
   */
  constructor() {}

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
  async create(data: CreateUserInput): Promise<User | boolean> {
    const userData = await userRepository.find({
      where: { mobile: data.mobile },
    });
    if (userData.length > 0) {
      return false;
    }
    const create = userRepository.create(data);
    return await userRepository.save(create);
  }
}
