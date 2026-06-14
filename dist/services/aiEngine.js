"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscapeRoomResponseSchema = void 0;
exports.generateEscapeRoom = generateEscapeRoom;
const google_genai_1 = require("@langchain/google-genai");
const prompts_1 = require("@langchain/core/prompts");
const output_parsers_1 = require("@langchain/core/output_parsers");
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// ─── Zod Schema — תואם ל-EscapeRoom.ts של MongoDB ────────────
exports.EscapeRoomResponseSchema = zod_1.z.object({
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
// ─── Prompt ───────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a world-class escape room designer.
Generate a complete textual escape room experience.

AUDIENCE RULES:
- Kids: lighthearted, simple math/logic, zero violence, short sentences.
- Teens: moderate complexity, mystery and adventure, mild tension.
- Adults: deep psychological tension, advanced cryptographic/scientific puzzles.

DIFFICULTY RULES:
- Easy: straightforward clues, single-step logic.
- Medium: multi-step reasoning, red herrings.
- Hard: complex ciphers, abstract lateral thinking.

CRITICAL: Respond with ONLY a raw JSON object. No markdown. No code blocks. No explanation. Just the JSON.

Exact format required:
{{"title":"string","storyBackground":"string","riddles":[{{"id":1,"question":"string","hint":"string","answer":"string"}},{{"id":2,"question":"string","hint":"string","answer":"string"}},{{"id":3,"question":"string","hint":"string","answer":"string"}}]}}

Now generate for:
Genre: {genre}
Difficulty: {difficulty}
Target Audience: {targetAudience}
Player Count: {playerCount}
Language: {language}`;
// ─── Chain ────────────────────────────────────────────────────
const model = new google_genai_1.ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash',
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.8,
});
const parser = new output_parsers_1.JsonOutputParser();
const prompt = prompts_1.PromptTemplate.fromTemplate(SYSTEM_PROMPT);
const chain = prompt.pipe(model).pipe(parser);
// ─── Main Function ────────────────────────────────────────────
async function generateEscapeRoom(input) {
    const raw = await chain.invoke({
        genre: input.genre,
        difficulty: input.difficulty,
        targetAudience: input.targetAudience,
        playerCount: input.playerCount.toString(),
        language: input.language ?? 'English',
    });
    const validated = exports.EscapeRoomResponseSchema.parse(raw);
    return validated;
}
