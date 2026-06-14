import { EscapeRoom } from '../models/EscapeRoom';

export class EscapeRoomDAL {
  static async findMany(query: Record<string, unknown>, skip: number, limit: number) {
    return EscapeRoom.find(query).skip(skip).limit(limit);
  }

  static async count(query: Record<string, unknown>): Promise<number> {
    return EscapeRoom.countDocuments(query);
  }

  static async findById(id: string) {
    return EscapeRoom.findById(id);
  }
}
