import { createClient } from "redis";
const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});
redisClient.on("error", (err) => console.error("Redis Client Error", err));
// Connect to Redis
(async () => {
    await redisClient.connect();
    console.log("Connected to Redis 🚀");
})();
export default redisClient;
//# sourceMappingURL=redis.js.map