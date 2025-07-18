import { UserProperties, UserModel } from './user.model.js';
import { AppError } from '../../utility/appError.js';

export class UserService {
  constructor(private readonly model = UserModel) {}

  async getAll(): Promise<UserModel[]> {
    const users = await this.model.findAll();
    if (!users) {
      throw new AppError('Internal Server Error');
    }
    return users;
  }

  async getById(userId: string): Promise<UserModel | null> {
    const user = await this.model.findByPk(userId);
    if (!user) {
      throw new AppError('Internal Server Error');
    }
    return user;
  }

  async create(userData: UserProperties): Promise<UserModel> {
    const createdUser = await this.model.create(userData);
    if (!createdUser) {
      throw new AppError('Internal Server Error');
    }
    return createdUser;
  }

  async update(userId: string, userData: UserProperties): Promise<UserModel> {
    const [count] = await this.model.update(userData, {
      where: { id: userId },
    });
    if (count === 0) {
      throw new AppError(`User with id ${userId} not found`);
    }
    const updated = await this.model.findByPk(userId);
    if (!updated) {
      throw new AppError(`User fetch failed after update`);
    }
    return updated;
  }

  async delete(userId: string): Promise<void> {
    const user = await this.model.findByPk(userId);
    if (!user) {
      throw new AppError(`User with ID ${userId} does not exist`);
    }
    try {
      await user.destroy();
    } catch (error) {
      throw new AppError('Internal Server Error');
    }
  }
}
