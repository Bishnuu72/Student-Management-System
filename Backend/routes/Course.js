const express = require("express");
const router = express.Router();
const Course = require("../model/StudentSchema");
const fetchUser = require("../middleware/FetchUser"); // Optional: use if you want to restrict access

// @route   POST /api/course/add
// @desc    Add new course
router.post("/add", fetchUser, async (req, res) => {
  try {
    const { name } = req.body;

    // Check if course already exists
    let courseExist = await Course.findOne({ name });
    if (courseExist) {
      return res.status(400).json({ error: "Course already exists" });
    }

    const course = new Course({ name });
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/course
// @desc    Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/course/:id
// @desc    Delete a course by ID
router.delete("/:id", fetchUser, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ msg: "Course deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
