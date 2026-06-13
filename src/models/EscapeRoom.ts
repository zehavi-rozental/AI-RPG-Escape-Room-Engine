import { Schema, model } from 'mongoose';
import { z } from 'zod';

// 1. סכמת ה-Zod של ה-AI
export const EscapeRoomSchema = z.object({
  title: z.string(),
  storyBackground: z.string(),
  riddles: z.array(
    z.object({
      id: z.number(),
      question: z.string(),
      hint: z.string(),
      answer: z.string()
    })
  ).length(3)
});

// 2. סכמת Mongoose עבור חידה בודדת
const riddleSchema = new Schema({
  id: { type: Number, required: true },
  question: { type: String, required: true },
  hint: { type: String, required: true },
  answer: { type: String, required: true }
}, { _id: false });

// 3. סכמת Mongoose עבור חדר הבריחה המלא
const escapeRoomSchema = new Schema({
  title: { type: String, required: true },
  storyBackground: { type: String, required: true },
  riddles: { type: [riddleSchema], required: true }
}, { timestamps: true });

// ולידציה לוודא שיש בדיוק 3 חידות במערך
escapeRoomSchema.path('riddles').validate(function(value: any[]) {
  return value.length === 3;
}, 'Escape room must have exactly 3 riddles.');

// 4. יצירה וייצוא של המודל (שימוש ב-escapeRoomSchema שהוגדר למעלה)
export const EscapeRoom = model('EscapeRoom', escapeRoomSchema);