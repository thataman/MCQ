// server.js
import express, { Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import questionrouter from './routes/questionrouter.js';
import rateLimiter from './utils/ratelimit.js';
// Load environment variables from .env file
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors({
  origin: [
    "https://test.sarojranjan.me",
    "https://www.test.sarojranjan.me",
    "http://localhost:5173" ,
    "https://mcq-tan.vercel.app",
    "https://www.mcq-tan.vercel.app"
  ],  
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie','X-Requested-With', ],
  exposedHeaders: ['Content-Length', 'Set-Cookie'],
  optionsSuccessStatus: 200,
  maxAge: 86400
}));
// Middleware to parse JSON
app.use(express.json());

app.use( "/" , rateLimiter);

app.all("/", (req, res) => {
  res.send("Welcome to the MCQ Platform API");
});


app.use("/question", questionrouter);






// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
