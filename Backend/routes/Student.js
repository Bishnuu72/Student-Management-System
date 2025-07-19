const express = require("express");
const Student = require("../model/StudentSchema");
const router = express.Router();

router.post("/add", async(req, res) => {
  // const {name, email, age, course} = req.body;
  try {
    let student = await Student.findOne({ email: req.body.email });
    if(student) {
      return res.status(400).json({message: "Student already registered with this Email"});
    }
    student = await Student.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      course: req.body.course,
    })
    res.status(201).json({message: "New Student Added Successfully"});
  } catch (error) {
    console.log(error);
  }

})

module.exports = router;