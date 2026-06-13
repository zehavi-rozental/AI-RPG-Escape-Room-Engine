import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });

client.on('error', (err) => console.error('[Redis] Connection error:', err));
client.on('connect', () => console.log('[Redis] Connected successfully'));

let isConnected = false;

export async function connectRedis(): Promise<void> {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
}

export async function getCache<T>(key: string): Promise<T | null> {
  await connectRedis();
  const data = await client.get(key);
  if (!data) return null;
  return JSON.parse(data) as T;
}

export async function setCache<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
  await connectRedis();
  await client.setEx(key, ttlSeconds, JSON.stringify(value));
}

export async function invalidateCache(key: string): Promise<void> {
  await connectRedis();
  await client.del(key);
}

export default client;