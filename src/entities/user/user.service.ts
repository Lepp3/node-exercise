import { UserModel } from '../../models/index.js';
import { UserProperties } from './user.model.js';

export class UserService {
  constructor(private readonly model = UserModel) {}

  async getAllUsers(): Promise<UserModel[]> {
    return await this.model.findAll();
  }

  async getUserById(id: string): Promise<UserModel | null> {
    return await this.model.findByPk(id);
  }

  async createUser(userData: UserProperties): Promise<UserModel | null> {
    return await this.model.create(userData);
  }

  async updateUser(
    userId: string,
    userData: UserProperties
  ): Promise<UserModel> {
    const [count] = await this.model.update(userData, {
      where: { id: userId },
    });
    if (count === 0) {
      throw new Error(`User with id ${userId} not found`);
    }
    const updated = await this.model.findByPk(userId);
    if (!updated) {
      throw new Error(`User fetch failed after update`);
    }
    return updated;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.model.findByPk(id, { paranoid: false });
    if (!user) {
      throw new Error(`User with ID ${id} does not exist`);
    }
    if (user.deletedAt) {
      throw new Error(`User with ID ${id} is already deleted`);
    }
    await user.destroy();
  }
}
