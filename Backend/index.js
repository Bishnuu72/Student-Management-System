const express = require('express');
const dotenv = require("dotenv");
const dbConnect = require("./config/db");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");

// Load environment variables early
dotenv.config();

// Connect to MongoDB
dbConnect();

const app = express();

// Middleware
app.use(cors()); // 👈 Allow cross-origin requests (important for frontend)
app.use(express.json()); // 👈 Enable JSON parsing

// Port fallback in case .env is missing
const port = process.env.PORT || 5000;

// 👋 Simple route
app.get('/', (req, res) => {
  res.send('Hello Bishnu!');
});

// 📂 Ensure uploads directory exists
const ensureUploadsDirectoryExists = () => {
  const dir = path.join(__dirname, "uploads");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
ensureUploadsDirectoryExists();

// 🧾 Multer config for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Serve uploads statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Handle file upload request
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// 👉 Student routes
app.use("/students", require("./routes/Student"));

// 🚀 Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
