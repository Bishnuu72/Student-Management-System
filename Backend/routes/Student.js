const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const fetchUser = require("../middleware/FetchUser");

// Route 1: Get all students - Protected
router.get("/fetch", fetchUser, async (req, res) => {
  try {
    const students = await Student.find({ user: req.user.id });
    res.json(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Add a new student - Protected
router.post("/add", fetchUser, async (req, res) => {
  try {
    const { name, email, phone, course, address } = req.body;

    const newStudent = new Student({
      name,
      email,
      phone,
      course,
      address,
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
  const { name, email, phone, course, address } = req.body;

  const updatedData = {};
  if (name) updatedData.name = name;
  if (email) updatedData.email = email;
  if (phone) updatedData.phone = phone;
  if (course) updatedData.course = course;
  if (address) updatedData.address = address;

  try {
    let student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send("Student not found");

    if (student.user.toString() !== req.user.id) {
      return res.status(401).send("Not authorized");
    }

    student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    res.json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Update failed");
  }
});

// Route 4: Delete a student by ID - Protected
router.delete("/delete/:id", fetchUser, async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
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
