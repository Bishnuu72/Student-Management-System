const express = require('express')
const dotenv = require("dotenv");
const dbConnect = require("./config/db");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
var cors = require("cors");

dbConnect();
const app = express()
app.use(express.json());

dotenv.config();
const port = process.env.PORT;


app.get('/', (req, res) => {
  res.send('Hello Bishnu!')
})

// Ensure the uploads directory exists
const ensureUploadsDirectoryExists = () => {
  const dir = path.join(__dirname, "uploads");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureUploadsDirectoryExists();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ensureUploadsDirectoryExists();
    cb(null, path.join(__dirname, "uploads")); // Use absolute path
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  res.send({ filePath: `/uploads/${req.file.filename}` });
});


app.use("/students", require("./routes/Student"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
