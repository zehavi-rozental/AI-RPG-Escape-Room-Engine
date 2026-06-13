import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

const generateToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || '', { expiresIn: '30d' });
};

router.post('/register', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password, role } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'Player'
    });

    res.status(201).json({
      er_token: generateToken(user._id.toString(), user.role),
      er_role: user.role,
      er_user: user.email
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        er_token: generateToken(user._id.toString(), user.role),
        er_role: user.role,
        er_user: user.email
      });
      return;
    }

    res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    next(error);
  }
});

export default router;