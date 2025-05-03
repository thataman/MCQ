"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.js
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const questionrouter_1 = __importDefault(require("./routes/questionrouter"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Enable CORS
app.use((0, cors_1.default)());
// Middleware to parse JSON
app.use(express_1.default.json());
app.use("/question", questionrouter_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
