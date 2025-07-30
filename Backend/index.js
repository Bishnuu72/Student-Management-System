const express = require('express');
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");

// Load environment variables early
dotenv.config();

// Connect to MongoDB with fallback URI
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await require("mongoose").connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();

// Middleware for handling CORS POLICY
// app.use(cors());
// app.use(
//   cors({
//     origin: ["https://localhost:5173",
//       "https://student-management-system-phi-inky.vercel.app"
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
//  );

const allowedOrigins = [
  "http://localhost:5173",
  "https://student-management-system-phi-inky.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json()); // 👈 Enable JSON parsing

// Port fallback in case .env is missing
const port = process.env.PORT;

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
app.use("/api/auth", require("./routes/auth"));
app.use("/students", require("./routes/Student"));
app.use("/api/courses", require("./routes/Course"));
app.use("/students/auth", require("./routes/StudentAuth"));
app.use("/api/profile", require("./routes/Profile"));

// 🚀 Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
