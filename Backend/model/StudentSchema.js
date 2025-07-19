const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  course: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model("student", StudentSchema);
module.exports = Student;