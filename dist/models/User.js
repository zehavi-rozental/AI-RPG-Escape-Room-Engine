"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['Player', 'Game_Master'],
        default: 'Player',
        required: true,
    },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
