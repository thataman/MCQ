import { Request, Response, NextFunction } from 'express';
import { valkey } from './rislint.js'; // your ioredis instance


const WINDOW_SIZE_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100;

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const key = `rate_limit:${ip}`;
  const now = Date.now();

  try {
    // remove all timestamps older than WINDOW_SIZE_MS
    await valkey.zremrangebyscore(key, 0, now - WINDOW_SIZE_MS);

    // get current count in window
    const reqCount = await valkey.zcard(key);

    if (reqCount >= MAX_REQUESTS) {
       res.status(429).json({ error: 'Too many requests - try again later.' });
       return
    }

    // add current timestamp with unique ID (to avoid duplicates)
    await valkey.zadd(key, now, `${now}:${Math.random().toString(36).substring(2)}`);

    // set expiration for key to auto-clean stale IPs
    await valkey.expire(key, Math.ceil(WINDOW_SIZE_MS / 1000));

    next();
  } catch (error) {
    console.error('Sliding rate limiter error:', error);
     res.status(500).json({ error: 'Internal rate limiter error' });
     return
  }
};

export default rateLimiter;
