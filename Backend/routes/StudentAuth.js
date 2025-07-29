const express = require("express");
const router = express.Router();
const Student = require("../model/StudentSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { fetchUser } = require("../middleware/FetchUser");

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret_key";

// Admin creates student
router.post("/create-student", [
  body("name", "Name is required").notEmpty(),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be at least 6 characters").isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, email, password, age, course } = req.body;

    // Check if student exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: "Student already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = new Student({
      name,
      email,
      age,
      course,
      password: hashedPassword,
      role: "student"
    });

    await newStudent.save();
    res.status(201).json({ message: "Student created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Student login
router.post("/student-login", [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email }).populate("course", "name");
    if (!student) return res.status(400).json({ error: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

    const payload = {
      user: {
        id: student._id,
        role: "student"
      }
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get logged-in student profile
router.get("/profile", fetchUser, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ error: "Access denied. Students only." });
    }

    const student = await Student.findById(req.user.id).select("-password").populate("course", "name");
    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
