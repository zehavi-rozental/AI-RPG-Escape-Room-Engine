import { NextFunction, Request, Response, Router } from 'express';
import { protect } from '../middleware/auth';
import { EscapeRoomService } from '../services/EscapeRoomService';

const router = Router();

router.get(
  '/',
  protect,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Number.parseInt(req.query.page as string, 10) || 1;
      const genre = req.query.genre as string | undefined;
      const { rooms, total } = await EscapeRoomService.getRooms(page, 6, genre);

      res.json({
        data: rooms,
        pagination: { total, page, pages: Math.ceil(total / 6) },
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/:id/verify',
  protect,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roomId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const { riddleId, answer } = req.body as {
        riddleId: number;
        answer: string;
      };
      const { isCorrect, room } = await EscapeRoomService.verifyAnswer(
        roomId ?? '',
        riddleId,
        answer,
      );

      if (!room) {
        res.status(404).json({ correct: false, message: 'Room not found' });
        return;
      }

      if (!isCorrect) {
        res.json({ correct: false, message: 'Wrong answer' });
        return;
      }

      if (riddleId === 3) {
        res.json({ correct: true, gameFinished: true });
        return;
      }

      const nextRiddle = room.riddles.find((r: { id: number }) => r.id === riddleId + 1);
      res.json({ correct: true, nextRiddle });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
