"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscapeRoomService = void 0;
const EscapeRoomDAL_1 = require("../dal/EscapeRoomDAL");
class EscapeRoomService {
    static async getRooms(page, limit, genre) {
        const query = genre ? { title: { $regex: genre, $options: 'i' } } : {};
        const rooms = await EscapeRoomDAL_1.EscapeRoomDAL.findMany(query, (page - 1) * limit, limit);
        const total = await EscapeRoomDAL_1.EscapeRoomDAL.count(query);
        return { rooms, total };
    }
    static async verifyAnswer(roomId, riddleId, answer) {
        const room = await EscapeRoomDAL_1.EscapeRoomDAL.findById(roomId);
        if (!room) {
            return { isCorrect: false, room: null };
        }
        const riddle = room.riddles.find((item) => item.id === riddleId);
        const isCorrect = Boolean(riddle && riddle.answer?.toLowerCase() === answer.toLowerCase());
        return { isCorrect, room };
    }
}
exports.EscapeRoomService = EscapeRoomService;
