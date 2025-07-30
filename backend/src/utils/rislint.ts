import { config } from "dotenv";
import {Redis} from "ioredis";

config();

let redisInstance: Redis | null = null;

function getRedisClient(): Redis {
    const serviceUrl = process.env.SERVICE_URI;

    if (!serviceUrl) {
        throw new Error("Missing Redis connection URI in environment variables.");
    }

    if (!redisInstance) {
        redisInstance = new Redis(serviceUrl);
    }

    return redisInstance;
}



export const valkey = getRedisClient()
