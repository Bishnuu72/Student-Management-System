const express = require('express');
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config(); // Load environment variables early

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5174",                          // Local frontend dev
  "https://student-management-system-phi-inky.vercel.app/",   // Your deployed frontend
];

// ✅ Enable dynamic CORS for specific origins
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ✅ Multer setup for file uploads
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

// ✅ Serve uploaded files statically
app.use("/uploads", express.static(uploadsDir));

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('Hello Bishnu! 🚀 Backend is running.');
});

// ✅ File upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// ✅ API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/students", require("./routes/Student"));
app.use("/api/courses", require("./routes/Course"));
app.use("/students/auth", require("./routes/StudentAuth"));
app.use("/api/profile", require("./routes/Profile"));

// ✅ Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
