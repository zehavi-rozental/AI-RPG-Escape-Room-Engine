import { EscapeRoomDAL } from '../dal/EscapeRoomDAL';

export class EscapeRoomService {
  static async getRooms(page: number, limit: number, genre?: string) {
    const query = genre ? { genre: { $regex: genre, $options: 'i' } } : {};

    const rooms = await EscapeRoomDAL.findMany(query, (page - 1) * limit, limit);
    const total = await EscapeRoomDAL.count(query);

    return { rooms, total };
  }

  static async verifyAnswer(roomId: string, riddleId: number, answer: string) {
    const room = await EscapeRoomDAL.findById(roomId);
    if (!room) {
      return { isCorrect: false, room: null };
    }

    const riddle = room.riddles.find((item: any) => item.id === riddleId);
    const isCorrect = Boolean(riddle && riddle.answer?.toLowerCase() === answer.toLowerCase());

    return { isCorrect, room };
  }
}