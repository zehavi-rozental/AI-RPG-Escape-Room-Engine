import { User } from '../models/User';

export class UserDAL {
  static async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  static async create(userData: any) {
    return await User.create(userData);
  }
}
