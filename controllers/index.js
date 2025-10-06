const Student = require("../models/Student");

// Create student
exports.createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.error("Error creating student:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error("Error in getAllStudents:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get single student
exports.getSingleStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error("Error in getSingleStudent:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });
    res.json(updatedStudent);
  } catch (err) {
    console.error("Error in updateStudent:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error in deleteStudent:", err);
    res.status(500).json({ message: err.message });
  }
};

// Add a course to a student
exports.addCourseToStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.courses.push(req.body.course);
    await student.save();

    res.json(student);
  } catch (err) {
    console.error("Error in addCourseToStudent:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all courses for a student
exports.getCourseByStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student.courses);
  } catch (err) {
    console.error("Error in getCourseByStudent:", err);
    res.status(500).json({ message: err.message });
  }
};
