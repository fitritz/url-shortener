const Url = require("../models/Url");
const generateShortCode = require("../services/urlServices");
const { client: redisClient, isConnected } = require("../config/redis");

exports.createShortUrl = async (req, res, next) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortCode = generateShortCode();

    const newUrl = await Url.create({
      originalUrl: url,
      shortCode
    });

    if (isConnected() && redisClient) {
      await redisClient.set(shortCode, url, { EX: 86400 });
    }

    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}`;

    res.status(201).json({
      originalUrl: url,
      shortUrl: `${baseUrl}/${shortCode}`,
      shortCode
    });
  } catch (err) {
    next(err);
  }
};

exports.redirectUrl = async (req, res, next) => {
  try {
    const { shortCode } = req.params;

    let cachedUrl = null;
    if (isConnected() && redisClient) {
      cachedUrl = await redisClient.get(shortCode);
    }

    if (cachedUrl) {
      const url = await Url.findOne({ shortCode });
      if (url) {
        url.clicks++;
        await url.save();
      }
      return res.redirect(cachedUrl);
    }

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    if (url.expiresAt && url.expiresAt < new Date()) {
      return res.status(410).json({ error: "Link expired" });
    }

    url.clicks++;
    await url.save();

    if (isConnected() && redisClient) {
      await redisClient.set(shortCode, url.originalUrl, { EX: 86400 });
    }

    res.redirect(url.originalUrl);
  } catch (err) {
    next(err);
  }
};