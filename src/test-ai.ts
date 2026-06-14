import { generateEscapeRoom } from './services/aiEngine';
import logger from './config/logger';

async function main() {
  logger.info('🎮 Testing AI Engine...\n');

  const result = await generateEscapeRoom({
    genre: 'Detective',
    difficulty: 'Medium',
    targetAudience: 'Adults',
    playerCount: 4,
    language: 'English',
  });

  logger.info('✅ Zod validation passed!\n');
  logger.info(`Title: ${result.title}`);
  logger.info(`Riddles count: ${result.riddles.length}`);
  logger.info('\nFull result:');
  logger.info(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  logger.error(`❌ Error: ${err.message}`);
  process.exit(1);
});
