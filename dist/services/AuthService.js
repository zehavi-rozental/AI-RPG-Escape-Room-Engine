"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserDAL_1 = require("../dal/UserDAL");
class AuthService {
    static generateToken(id, role) {
        return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET || 'dev-secret', {
            expiresIn: '30d',
        });
    }
    static async registerUser(data) {
        const { username, email, password, role } = data;
        const userExists = await UserDAL_1.UserDAL.findByEmail(email);
        if (userExists) {
            throw new Error('User already exists');
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        return UserDAL_1.UserDAL.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'Player',
        });
    }
    static async loginUser(email, password) {
        const user = await UserDAL_1.UserDAL.findByEmail(email);
        if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }
        return user;
    }
}
exports.AuthService = AuthService;
