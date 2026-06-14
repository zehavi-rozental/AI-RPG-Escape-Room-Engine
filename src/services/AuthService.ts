import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserDAL } from '../dal/UserDAL';

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export class AuthService {
  static generateToken(id: string, role: string): string {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'dev-secret', {
      expiresIn: '30d',
    });
  }

  static async registerUser(data: RegisterPayload) {
    const { username, email, password, role } = data;

    const userExists = await UserDAL.findByEmail(email);
    if (userExists) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return UserDAL.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'Player',
    });
  }

  static async loginUser(email: string, password: string) {
    const user = await UserDAL.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }

    return user;
  }
}
