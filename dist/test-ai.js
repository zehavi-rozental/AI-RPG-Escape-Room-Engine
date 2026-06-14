"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aiEngine_1 = require("./services/aiEngine");
const logger_1 = __importDefault(require("./config/logger"));
async function main() {
    logger_1.default.info('🎮 Testing AI Engine...\n');
    const result = await (0, aiEngine_1.generateEscapeRoom)({
        genre: 'Detective',
        difficulty: 'Medium',
        targetAudience: 'Adults',
        playerCount: 4,
        language: 'English',
    });
    logger_1.default.info('✅ Zod validation passed!\n');
    logger_1.default.info(`Title: ${result.title}`);
    logger_1.default.info(`Riddles count: ${result.riddles.length}`);
    logger_1.default.info('\nFull result:');
    logger_1.default.info(JSON.stringify(result, null, 2));
}
main().catch((err) => {
    logger_1.default.error(`❌ Error: ${err.message}`);
    process.exit(1);
});
