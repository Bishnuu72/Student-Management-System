const express = require("express");
const User = require("../model/AdminSchema");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { fetchUser } = require("../middleware/FetchUser");


const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret_key"; // make sure to use env in production

// ROUTE 1: Create an Admin User (Signup)
router.post("/admin-register", [
  body("name", "Name is required").notEmpty(),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be at least 6 characters").isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    let { name, email, password } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPass,
      role: "admin"  // ✅ Automatically set role to admin
    });

    const token = jwt.sign({ user: { id: user._id, role: user.role } }, JWT_SECRET);
    res.json({ token, role: user.role });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ROUTE 2: Login Admin User
router.post("/admin-login", [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

    const token = jwt.sign({ user: { id: user._id, role: user.role } }, JWT_SECRET);
    res.json({ token, role: user.role });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ROUTE 3: Get Logged In Admin Info
router.get("/getuser", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
