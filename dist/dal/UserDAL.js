"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDAL = void 0;
const User_1 = require("../models/User");
class UserDAL {
    static async findByEmail(email) {
        return await User_1.User.findOne({ email });
    }
    static async create(userData) {
        return await User_1.User.create(userData);
    }
}
exports.UserDAL = UserDAL;
