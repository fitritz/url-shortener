# 🔗 URL Shortener

A simple and efficient URL shortening service built with Node.js, Express, MongoDB, and Redis caching.

## 📋 Features

- **Shorten URLs** - Convert long URLs into short, shareable links
- **Click Tracking** - Track the number of times each shortened URL is accessed
- **Redis Caching** - Fast retrieval with Redis caching (24-hour TTL)
- **Expiration Support** - Set expiration dates for shortened URLs
- **User-Friendly Frontend** - Beautiful, responsive web interface
- **RESTful API** - Easy integration with other applications

---

## 📁 Project Structure

```
url-shortener/
├── config/
│   └── redis.js           # Redis client configuration
├── controllers/
│   └── urlController.js   # URL shortening logic
├── models/
│   └── Url.js             # MongoDB schema
├── routes/
│   └── urlRoutes.js       # API endpoints
├── services/
│   └── urlServices.js     # Short code generation
├── frontend/
│   ├── index.html         # Frontend UI
│   ├── style.css          # Styling
│   └── script.js          # Frontend logic
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Environment variables
└── README.md              # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v14+
- **MongoDB** (local or cloud)
- **Redis** (optional, for caching)
- **Docker** (optional, for easy setup)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**

   ```bash
   cp .env.example .env
   ```

4. **Update `.env` with your settings**
   ```
   MONGO_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/url-shortener
   REDIS_HOST=localhost
   REDIS_PORT=6379
   PORT=5000
   ```

### Running the Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

Server will run on `http://localhost:5000`

---

## 🐳 Docker Setup (Optional)

### Start Redis with Docker

```bash
docker run -d -p 6379:6379 --name redis redis
```

### Start MongoDB with Docker

```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

---

## 🧪 Testing the API

### Using Thunder Client / Postman

#### 1. Create a Short URL

- **Method:** POST
- **URL:** `http://localhost:5000/shorten`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "url": "https://www.example.com/very/long/url"
  }
  ```
- **Response:**
  ```json
  {
    "originalUrl": "https://www.example.com/very/long/url",
    "shortUrl": "http://localhost:5000/abc1234",
    "shortCode": "abc1234"
  }
  ```

#### 2. Access Shortened URL

- **Method:** GET
- **URL:** `http://localhost:5000/abc1234`
- **Response:** Redirects to original URL

### Using the Frontend

1. Open `frontend/index.html` in your browser
2. Enter a long URL
3. Click "Shorten URL"
4. Copy and share the shortened link

---

## 📊 Database Schema

### URL Model

```javascript
{
  originalUrl: String,      // Original long URL
  shortCode: String,        // Unique short code (7 chars)
  createdAt: Date,          // Creation timestamp
  expiresAt: Date,          // Optional expiration
  clicks: Number            // Click counter
}
```

---

## 🔧 API Endpoints

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| POST   | `/shorten`          | Create a shortened URL   |
| GET    | `/:shortCode`       | Redirect to original URL |
| GET    | `/stats/:shortCode` | Get URL statistics       |

---

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **redis** - Caching layer
- **nanoid** - Random short code generation
- **dotenv** - Environment variables
- **cors** - Cross-origin support

---

## 🌐 Deployment

### Deploy to Render.com (Recommended)

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "URL Shortener API"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect GitHub repo
   - Add environment variables:
     ```
     MONGO_URI=your-mongodb-uri
     REDIS_HOST=your-redis-host
     REDIS_PORT=6379
     ```
   - Deploy!

### Deploy to Heroku

```bash
heroku create your-app-name
heroku config:set MONGO_URI=your-mongodb-uri
heroku config:set REDIS_HOST=your-redis-host
git push heroku main
```

### Deploy Frontend

1. Update `API_URL` in `frontend/script.js`:

   ```javascript
   const API_URL = "https://your-api.com";
   ```

2. Deploy frontend folder to:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages

---

## 🛠️ Troubleshooting

### Redis Connection Error

- Ensure Redis is running: `redis-server`
- Or use Docker: `docker run -d -p 6379:6379 redis`
- App works without Redis (no caching)

### MongoDB Connection Error

- Check `.env` contains valid `MONGO_URI`
- Ensure MongoDB is running locally or accessible
- Check network access in MongoDB Atlas

### CORS Issues

- CORS is enabled in `server.js`
- Works with frontend on any URL

---

## 📝 Environment Variables

Create `.env` file with:

```
MONGO_URI=mongodb://localhost:27017/url-shortener
REDIS_HOST=localhost
REDIS_PORT=6379
PORT=5000
```

---

## 📄 License

MIT License - feel free to use this project!

---

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Support

For issues and questions, please create an issue on GitHub.

---

**Happy URL Shortening! 🎉**
