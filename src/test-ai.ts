import { generateEscapeRoom } from './services/aiEngine';

async function main() {
  console.log('🎮 Testing AI Engine...\n');

  const result = await generateEscapeRoom({
    genre: 'Detective',
    difficulty: 'Medium',
    targetAudience: 'Adults',
    playerCount: 4,
    language: 'English',
  });

  console.log('✅ Zod validation passed!\n');
  console.log('Title:', result.title);
  console.log('Riddles count:', result.riddles.length);
  console.log('\nFull result:');
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});