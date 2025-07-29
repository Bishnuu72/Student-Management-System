const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'student'],
    default: 'admin',  // Default role changed to admin here
  },
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("Admin", adminSchema);

module.exports = User;
