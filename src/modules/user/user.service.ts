import { Injectable, NotFoundException } from '@nestjs/common';
import { userRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AbstractService } from 'src/commons/abstract.service';

@Injectable()
export class UserService extends AbstractService {
  /**
   * Constructor for UserService.
   * Injects dependencies and initializes the abstract service with the user repository.
   *
   * @param {ResponseMsgService} responseMsgService - Service to handle response messages.
   */
  constructor() {
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
    const create = userRepository.create(data);
    return await userRepository.save(create);
  }

  async update(id: number, data: UpdateUserInput): Promise<User | boolean> {
    const userData = await userRepository.findOne({ where: { id } });
    if (!userData) {
      throw new NotFoundException('User with this ID does not exist.');
    }
    const updateResult = await userRepository.update(id, data);
    if (updateResult.affected && updateResult.affected > 0) {
      return true;
    }
    return false;
  }
}
