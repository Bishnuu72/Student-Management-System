// index.js
const express = require('express');
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config(); // Load env variables

// Connect to MongoDB
connectDB();

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://student-management-system-j8f3.onrender.com",
];

// CORS Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin like mobile apps or curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

// JSON parser middleware
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Serve uploaded files statically
app.use("/uploads", express.static(uploadsDir));

// Health check route
app.get('/', (req, res) => {
  res.send('Hello Bishnu! 🚀 Backend is running.');
});

// File upload route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/students", require("./routes/Student"));
app.use("/api/courses", require("./routes/Course"));
app.use("/students/auth", require("./routes/StudentAuth"));
app.use("/api/profile", require("./routes/Profile"));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
