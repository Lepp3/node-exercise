import { UserModel } from '../../models/index.js';
import { type UserProps } from './user.types.js';

export class UserService {
  constructor(private readonly model = UserModel) {}

  async getAllUsers(): Promise<UserModel[]> {
    return await this.model.findAll();
  }

  async getUserById(id: string): Promise<UserModel | null> {
    return await this.model.findByPk(id);
  }

  async createUser(userData: UserProps): Promise<UserModel | null> {
    return await this.model.create(userData);
  }

  async updateUser(id: string, userData: UserProps): Promise<UserModel> {
    const [count] = await this.model.update(userData, { where: { id } });
    if (count === 0) throw new Error(`User with id ${id} not found`);
    const updated = await this.model.findByPk(id);
    if (!updated) throw new Error(`User fetch failed after update`);
    return updated;
  }

  async deleteUser(id: string): Promise<void> {
    const entity = await this.model.findByPk(id, { paranoid: false });
    if (!entity) throw new Error(`User with ID ${id} does not exist`);
    if (entity.deletedAt)
      throw new Error(`User with ID ${id} is already deleted`);
    await entity.destroy();
  }
}
