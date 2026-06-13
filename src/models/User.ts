import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Player', 'Game_Master'], default: 'Player', required: true }
}, { timestamps: true });

export const User = model('User', userSchema);