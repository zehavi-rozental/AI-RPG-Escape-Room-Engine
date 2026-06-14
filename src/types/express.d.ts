declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: 'Player' | 'Game_Master';
      };
    }
  }
}

export {};
