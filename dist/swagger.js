"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'Escape Room API', version: '1.0.0' },
    },
    // כאן אנחנו מגדירים את התיעוד ישירות (או מפנים אותו ל-Routes אם נרצה)
    // אבל הדרך הכי נקייה היא להגדיר כאן את ה-Paths בצורה מרוכזת
    apis: ['./src/routes/*.ts'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
