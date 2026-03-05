const redis = require("redis");

let client = null;
let isConnected = false;

const createClient = async () => {
  try {
    let redisUrl = process.env.REDIS_URL;
    
    // Convert redis:// to rediss:// for TLS (Upstash requirement)
    if (redisUrl && redisUrl.startsWith("redis://default:")) {
      redisUrl = redisUrl.replace("redis://", "rediss://");
    }
    
    const config = redisUrl 
      ? { url: redisUrl }
      : {
          host: process.env.REDIS_HOST || "localhost",
          port: process.env.REDIS_PORT || 6379
        };

    client = redis.createClient(config);

    client.on("error", (err) => {
      console.warn("⚠️ Redis connection warning:", err.message);
      isConnected = false;
    });

    client.on("connect", () => {
      console.log("✅ Redis connected");
      isConnected = true;
    });

    await client.connect();
    isConnected = true;
  } catch (err) {
    console.warn("⚠️ Redis unavailable - running without cache");
    isConnected = false;
  }
};

createClient();

module.exports = { client, isConnected: () => isConnected };