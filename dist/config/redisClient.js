"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = connectRedis;
exports.getCache = getCache;
exports.setCache = setCache;
exports.invalidateCache = invalidateCache;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./logger"));
dotenv_1.default.config();
const client = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});
client.on('error', (err) => logger_1.default.error(`[Redis] Connection error: ${err.message}`));
client.on('connect', () => logger_1.default.info('[Redis] Connected successfully'));
let isConnected = false;
async function connectRedis() {
    if (!isConnected) {
        await client.connect();
        isConnected = true;
    }
}
async function getCache(key) {
    await connectRedis();
    const data = await client.get(key);
    if (!data)
        return null;
    return JSON.parse(data);
}
async function setCache(key, value, ttlSeconds) {
    await connectRedis();
    await client.setEx(key, ttlSeconds, JSON.stringify(value));
}
async function invalidateCache(key) {
    await connectRedis();
    await client.del(key);
}
exports.default = client;
