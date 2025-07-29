const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
