"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscapeRoom = exports.EscapeRoomSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
// 1. סכמת ה-Zod של ה-AI
exports.EscapeRoomSchema = zod_1.z.object({
    title: zod_1.z.string(),
    storyBackground: zod_1.z.string(),
    riddles: zod_1.z
        .array(zod_1.z.object({
        id: zod_1.z.number(),
        question: zod_1.z.string(),
        hint: zod_1.z.string(),
        answer: zod_1.z.string(),
    }))
        .length(3),
});
// 2. סכמת Mongoose עבור חידה בודדת
const riddleSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    question: { type: String, required: true },
    hint: { type: String, required: true },
    answer: { type: String, required: true },
}, { _id: false });
// 3. סכמת Mongoose עבור חדר הבריחה המלא
const escapeRoomSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    storyBackground: { type: String, required: true },
    riddles: { type: [riddleSchema], required: true },
}, { timestamps: true });
// ולידציה לוודא שיש בדיוק 3 חידות במערך
escapeRoomSchema.path('riddles').validate(function (value) {
    return value.length === 3;
}, 'Escape room must have exactly 3 riddles.');
// 4. יצירה וייצוא של המודל (שימוש ב-escapeRoomSchema שהוגדר למעלה)
exports.EscapeRoom = (0, mongoose_1.model)('EscapeRoom', escapeRoomSchema);
