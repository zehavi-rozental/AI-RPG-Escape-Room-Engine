import { Router, Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

const router = Router();

router.post('/register', async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  try {
    const user = await AuthService.registerUser(req.body);
    res.status(201).json({
      er_token: AuthService.generateToken(user._id.toString(), user.role),
      er_role: user.role,
      er_user: user.email
    });
  } catch (_error) {
    _next(_error);
  }
});

router.post('/login', async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  try {
    const user = await AuthService.loginUser(req.body.email, req.body.password);
    res.json({
      er_token: AuthService.generateToken(user._id.toString(), user.role),
      er_role: user.role,
      er_user: user.email
    });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
});

export default router;