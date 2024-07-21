import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the MERN application!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
