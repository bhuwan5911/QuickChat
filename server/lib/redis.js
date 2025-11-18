import { createClient } from 'redis';

// Redis client banayein
const redisClient = createClient({
  // Default URL (localhost on port 6379)
  // Agar Docker ya local par chala rahe hain toh URL daalne ki zaroorat nahi.
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis connected successfully!'));

// Connection shuru karein
await redisClient.connect();

export default redisClient;
