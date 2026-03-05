const redis = require("redis");

let client = null;
let isConnected = false;

const createClient = async () => {
  try {
    client = redis.createClient({
      host: process.env.REDIS_HOST || "localhost",
      port: process.env.REDIS_PORT || 6379
    });

    client.on("error", (err) => {
      console.warn("⚠️ Redis connection warning:", err.message);
      isConnected = false;
    });

    await client.connect();
    isConnected = true;
    console.log("✅ Redis connected");
  } catch (err) {
    console.warn("⚠️ Redis unavailable - running without cache");
    isConnected = false;
  }
};

createClient();

module.exports = { client, isConnected: () => isConnected };