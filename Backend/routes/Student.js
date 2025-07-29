const express = require("express");
const router = express.Router();
const Student = require("../model/StudentSchema");
const Course = require("../model/CourseSchema");
const { fetchUser, isAdmin } = require("../middleware/FetchUser");
const bcrypt = require("bcryptjs");

// Route 1: Get all students for logged-in admin - Protected & Admin-only
router.get("/allstudents", fetchUser, isAdmin, async (req, res) => {
  try {
    const students = await Student.find({ user: req.user.id }).populate("course");
    res.json(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Add a new student - Protected & Admin-only
router.post("/addstudent", fetchUser, isAdmin, async (req, res) => {
  try {
    const { name, age, email, course, password } = req.body;

    // Find course by ID
    const foundCourse = await Course.findById(course);
    if (!foundCourse) {
      return res.status(400).json({ error: "Course not found!" });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newStudent = new Student({
      name,
      email,
      age,
      course: foundCourse._id,
      password: hashedPass,
      user: req.user.id,
    });

    const savedStudent = await newStudent.save();

    // ✅ Populate the course before sending response
    const populatedStudent = await Student.findById(savedStudent._id).populate("course");
    res.json(populatedStudent);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to add student");
  }
});

// Route 3: Update a student by ID - Protected & Admin-only
router.put("/update/:id", fetchUser, isAdmin, async (req, res) => {
  const { name, email, age, course, password } = req.body;

  const updatedData = {};
  if (name) updatedData.name = name;
  if (email) updatedData.email = email;
  if (age) updatedData.age = age;

  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send("Student not found");

    // Ensure student belongs to the admin
    if (student.user.toString() !== req.user.id) {
      return res.status(401).send("Not authorized");
    }

    // If course ID provided, convert to ObjectId
    if (course) {
      const foundCourse = await Course.findById(course);
      if (!foundCourse) {
        return res.status(400).json({ error: "Course not found!" });
      }
      updatedData.course = foundCourse._id;
    }

    // If password provided, hash it before update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    res.json(updatedStudent);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Update failed");
  }
});

// Route 4: Delete a student by ID - Protected & Admin-only
router.delete("/delete/:id", fetchUser, isAdmin, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send("Student not found");

    // Ensure student belongs to the admin
    if (student.user.toString() !== req.user.id) {
      return res.status(401).send("Not authorized");
    }

    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Delete failed");
  }
});

module.exports = router;
