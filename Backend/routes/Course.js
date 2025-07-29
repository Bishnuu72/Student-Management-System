const express = require("express");
const router = express.Router();
const Course = require("../model/CourseSchema");

// Correct import: destructure both middleware functions
const { fetchUser, isAdmin } = require("../middleware/FetchUser");

// @route   POST /api/course/addcourse
// @desc    Add new course - Admin only
router.post("/addcourse", fetchUser, isAdmin, async (req, res) => {
  try {
    const { name } = req.body;

    let courseExist = await Course.findOne({ name, admin: req.user.id });
    if (courseExist) {
      return res.status(400).json({ error: "Course already exists for this admin" });
    }

    const course = new Course({ name, admin: req.user.id });
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/course/allcourses
// @desc    Get all courses for the logged-in admin
router.get("/allcourses", fetchUser, isAdmin, async (req, res) => {
  try {
    const courses = await Course.find({ admin: req.user.id });
    res.json(courses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/course/deletecourses/:id
// @desc    Delete a course by ID - Admin only
router.delete("/deletecourses/:id", fetchUser, isAdmin, async (req, res) => {
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

// @route   PUT /api/course/updatecourse/:id
// @desc    Update a course by ID - Admin only
router.put("/updatecourse/:id", fetchUser, isAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    let course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: "Course not found" });

    course.name = name || course.name;

    await course.save();
    res.json(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
