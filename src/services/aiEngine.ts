import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

// ─── Zod Schema — תואם ל-EscapeRoom.ts של MongoDB ────────────
export const EscapeRoomResponseSchema = z.object({
  title: z.string(),
  storyBackground: z.string(),
  riddles: z
    .array(
      z.object({
        id: z.number(),
        question: z.string(),
        hint: z.string(),
        answer: z.string(),
      })
    )
    .length(3),
});

export type EscapeRoomResponse = z.infer<typeof EscapeRoomResponseSchema>;

export interface GenerateEscapeRoomInput {
  genre: 'Horror' | 'Sci-Fi' | 'Detective' | 'Fantasy';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  targetAudience: 'Kids' | 'Teens' | 'Adults';
  playerCount: number;
  language?: string;
}

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
const model = new ChatGoogleGenerativeAI({
  model: 'gemini-2.0-flash',
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.8,
});

const parser = new JsonOutputParser<EscapeRoomResponse>();
const prompt = PromptTemplate.fromTemplate(SYSTEM_PROMPT);
const chain = prompt.pipe(model).pipe(parser);

// ─── Main Function ────────────────────────────────────────────
export async function generateEscapeRoom(
  input: GenerateEscapeRoomInput
): Promise<EscapeRoomResponse> {
  const raw = await chain.invoke({
    genre: input.genre,
    difficulty: input.difficulty,
    targetAudience: input.targetAudience,
    playerCount: input.playerCount.toString(),
    language: input.language ?? 'English',
  });

  const validated = EscapeRoomResponseSchema.parse(raw);
  return validated;
}
