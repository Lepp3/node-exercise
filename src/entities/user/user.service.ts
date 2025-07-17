import { UserProperties, UserModel } from './user.model.js';

export class UserService {
  constructor(private readonly model = UserModel) {}

  async getAll(): Promise<UserModel[]> {
    return await this.model.findAll();
  }

  async getById(id: string): Promise<UserModel | null> {
    return await this.model.findByPk(id);
  }

  async create(userData: UserProperties): Promise<UserModel | null> {
    return await this.model.create(userData);
  }

  async update(userId: string, userData: UserProperties): Promise<UserModel> {
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

  async delete(userId: string): Promise<void> {
    const user = await this.model.findByPk(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} does not exist`);
    }

    await user.destroy();
  }
}
