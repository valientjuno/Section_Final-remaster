const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  currentCollege: String,
  courses: [String],
});

module.exports = mongoose.model("Student", studentSchema);
