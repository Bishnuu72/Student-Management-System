const express = require("express");
const router = express.Router();
const Student = require("../model/StudentSchema");
const Course = require("../model/CourseSchema");
const fetchUser = require("../middleware/FetchUser");

// Route 1: Get all students - Protected
router.get("/allstudents", fetchUser, async (req, res) => {
  try {
    const students = await Student.find({ user: req.user.id }).populate("course");
    res.json(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Add a new student - Protected
router.post("/addstudent", fetchUser, async (req, res) => {
  try {
    const { name, age, email, course, password } = req.body;

    // 🔍 Find course by name to get ObjectId
    const foundCourse = await Course.findById(course );
    if (!foundCourse) {
      return res.status(400).json({ error: "Course not found!" });
    }

    const newStudent = new Student({
      name,
      email,
      age,
      course: foundCourse._id, // ✅ Use ObjectId
      password,
      user: req.user.id,
    });

    const savedStudent = await newStudent.save();
    res.json(savedStudent);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to add student");
  }
});

// Route 3: Update a student by ID - Protected
router.put("/update/:id", fetchUser, async (req, res) => {
  const { name, email, age, course, password } = req.body;

  const updatedData = {};
  if (name) updatedData.name = name;
  if (email) updatedData.email = email;
  if (age) updatedData.age = age;
  if (password) updatedData.password = password;

  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send("Student not found");

    if (student.user.toString() !== req.user.id) {
      return res.status(401).send("Not authorized");
    }

    // 🔍 If course name provided, convert to ObjectId
    if (course) {
      const foundCourse = await Course.findById(course);
      if (!foundCourse) {
        return res.status(400).json({ error: "Course not found!" });
      }
      updatedData.course = foundCourse._id;
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

// Route 4: Delete a student by ID - Protected
router.delete("/delete/:id", fetchUser, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send("Student not found");

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
