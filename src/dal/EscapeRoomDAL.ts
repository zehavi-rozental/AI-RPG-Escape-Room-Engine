import { EscapeRoom } from '../models/EscapeRoom';

export class EscapeRoomDAL {
  static async findMany(query: any, skip: number, limit: number) {
    return await EscapeRoom.find(query).skip(skip).limit(limit);
  }
  static async count(query: any) {
    return await EscapeRoom.countDocuments(query);
  }
  static async findById(id: string) {
    return await EscapeRoom.findById(id);
  }
}