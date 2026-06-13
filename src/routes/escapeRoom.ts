import { Router, Request, Response, NextFunction } from 'express';
import { EscapeRoom, EscapeRoomSchema } from '../models/EscapeRoom';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// 1. נתיב יצירת חדר בריחה (POST /api/escape-rooms/create)
// מוגן על ידי ה-Middleware של ה-Game_Master, אוכף את ה-Mock JSON (או ה-AI של בת ב')
router.post('/create', protect, authorize('Game_Master'), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // ולידציית ה-Zod של ה-AI / מבנה החדר
    const parsedData = EscapeRoomSchema.parse(req.body);
    const escapeRoom = await EscapeRoom.create(parsedData);
    res.status(201).json(escapeRoom);
  } catch (error) {
    next(error);
  }
});

// 2. נתיב קטלוג המשחקים עם פגינציה וסינון (GET /api/escape-rooms)
// מחזיר בדיוק 6 חדרים בכל פעם באמצעות .skip() ו-.limit()
router.get('/', protect, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 6; // הגדרה קבועה של בדיוק 6 חדרים לעמוד לפי האפיון
    const skip = (page - 1) * limit;
    
    // קריאת סינון לפי ז'אנר (אם קיים)
    const genre = req.query.genre as string;

    const query: any = {};
    if (genre) {
      query.genre = { $regex: genre, $options: 'i' };
    }

    const total = await EscapeRoom.countDocuments(query);
    const rooms = await EscapeRoom.find(query).skip(skip).limit(limit);

    res.json({
      data: rooms,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// נתיב עזר אופציונלי: תחילת משחק (שליפת חדר בודד ללא חשיפת התשובות)
router.get('/:id/start', protect, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const room = await EscapeRoom.findById(req.params.id);
    if (!room) {
      res.status(404).json({ message: 'Escape room not found' });
      return;
    }

    const firstRiddle = room.riddles.find(r => r.id === 1);
    res.json({
      _id: room._id,
      title: room.title,
      storyBackground: room.storyBackground,
      firstRiddle: firstRiddle ? { id: firstRiddle.id, question: firstRiddle.question, hint: firstRiddle.hint } : null
    });
  } catch (error) {
    next(error);
  }
});

// 3. נתיב בדיקת התשובות הדיסקרטי (POST /api/escape-rooms/:id/verify)
// מקבל מספר שלב ותשובה, בודק מול הדאטהבייס בדיסקרטיות ומחזיר סטטוס הצלחה
router.post('/:id/verify', protect, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { riddleId, answer } = req.body;

    const room = await EscapeRoom.findById(id);
    if (!room) {
      res.status(404).json({ message: 'Escape room not found' });
      return;
    }

    const currentRiddle = room.riddles.find(r => r.id === riddleId);
    if (!currentRiddle) {
      res.status(400).json({ message: 'Invalid riddle ID' });
      return;
    }

    // השוואה דיסקרטית בצד שרת (Server-side verification)
    const isCorrect = currentRiddle.answer.trim().toLowerCase() === answer.trim().toLowerCase();
    
    if (!isCorrect) {
      res.json({ correct: false, message: 'Wrong answer, try again.' });
      return;
    }

    // אם התשובה נכונה - בודקים האם המשחק נגמר (שלב 3) או שיש שלב הבא
    if (riddleId === 3) {
      res.json({ correct: true, gameFinished: true, message: 'Congratulations! You escaped!' });
      return;
    }

    const nextRiddle = room.riddles.find(r => r.id === riddleId + 1);
    res.json({
      correct: true,
      gameFinished: false,
      nextRiddle: nextRiddle ? { id: nextRiddle.id, question: nextRiddle.question, hint: nextRiddle.hint } : null
    });
  } catch (error) {
    next(error);
  }
});

export default router;