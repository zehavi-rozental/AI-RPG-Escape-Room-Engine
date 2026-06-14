"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscapeRoomDAL = void 0;
const EscapeRoom_1 = require("../models/EscapeRoom");
class EscapeRoomDAL {
    static async findMany(query, skip, limit) {
        return EscapeRoom_1.EscapeRoom.find(query).skip(skip).limit(limit);
    }
    static async count(query) {
        return EscapeRoom_1.EscapeRoom.countDocuments(query);
    }
    static async findById(id) {
        return EscapeRoom_1.EscapeRoom.findById(id);
    }
}
exports.EscapeRoomDAL = EscapeRoomDAL;
