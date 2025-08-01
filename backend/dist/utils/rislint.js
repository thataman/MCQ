import { config } from "dotenv";
import { Redis } from "ioredis";
config();
let redisInstance = null;
function getRedisClient() {
    const serviceUrl = process.env.serviceUri;
    if (!serviceUrl) {
        throw new Error("Missing Redis connection URI in environment variables.");
    }
    if (!redisInstance) {
        redisInstance = new Redis(serviceUrl);
    }
    return redisInstance;
}
export const valkey = getRedisClient();
