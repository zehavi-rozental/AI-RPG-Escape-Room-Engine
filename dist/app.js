"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit")); // ייבוא ה-Rate Limiter
const db_1 = require("./config/db"); // וודאי שהקובץ קיים בנתיב הזה
const auth_1 = __importDefault(require("./routes/auth"));
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = __importDefault(require("./config/logger"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// 1. הגדרת Rate Limiter (מגביל ל-100 בקשות בכל 15 דקות לכל IP)
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 דקות
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(limiter); // החלת ההגנה על כל הנתיבים
// התחברות ל-DB
if (process.env.NODE_ENV !== 'test') {
    (0, db_1.connectDB)().catch((err) => logger_1.default.error('DB connection failed:', err));
}
app.use('/api/auth', auth_1.default);
app.use(errorHandler_1.errorHandler);
// הפעלת השרת
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => logger_1.default.info(`Server running on port ${PORT}`));
}
