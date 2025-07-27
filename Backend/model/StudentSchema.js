const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // make sure this matches your user model name
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // Referencing Course model
    required: true,
  },
  password: { type: String, required: true }, // optionally make this not required
  date: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model("student", StudentSchema);
module.exports = Student;
