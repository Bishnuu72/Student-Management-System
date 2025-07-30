const express = require('express');
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Allowed origins without trailing slash
const allowedOrigins = [
  "http://localhost:5174",
  "https://student-management-system-phi-inky.vercel.app",
];

// ✅ CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Parse JSON
app.use(express.json());

// Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup
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

// Serve uploaded files
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

// Routes
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
