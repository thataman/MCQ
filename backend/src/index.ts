// server.js
import express, { Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import questionrouter from './routes/questionrouter';
// Load environment variables from .env file
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

app.use("/question",questionrouter)






// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
