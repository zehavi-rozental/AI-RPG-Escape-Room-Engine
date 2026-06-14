import { UserDAL } from '../dal/UserDAL';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  static generateToken(id: string, role: string): string {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || '', { expiresIn: '30d' });
  }

  static async registerUser(data: any) {
    const { username, email, password, role } = data;
    
    // פנייה ל-DAL
    const userExists = await UserDAL.findByEmail(email);
    if (userExists) throw new Error('User already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // פנייה ל-DAL
    return await UserDAL.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'Player'
    });
  }

  static async loginUser(email: string, password: string) {
    // פנייה ל-DAL
    const user = await UserDAL.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }
    return user;
  }
}