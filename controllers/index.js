// controllers/studentController.js
const { response } = require("express");
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// GET courses by student
const getCourseByStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Find the student
    const student = await mongodb
      .getDb()
      .db()
      .collection("students")
      .findOne({ _id: new ObjectId(studentId) });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Return only the course IDs array
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(student.courses || []);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addCourseToStudent = async (req, res) => {
  try {
    const studentId = req.params.id; // student id from URL
    const { courseId } = req.body;
    console.log(courseId);
    const result = await mongodb
      .getDb()
      .db()
      .collection("students")
      .updateOne(
        { _id: new ObjectId(studentId) },
        { $push: { courses: courseId } }
      );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Course added to student" });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET All Students
const getAllStudents = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("students").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSingleStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("students")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// CREATE contact
const createStudent = async (req, res) => {
  try {
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      currentCollege: req.body.currentCollege,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("students")
      .insertOne(student);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occured while creating the student."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete student

const deleteStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("students")
      .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.acknowledged) {
      res.status(200).send(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the student."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// custom page stealth

module.exports = {
  getAllStudents,
  getSingleStudent,
  createStudent,
  deleteStudent,
  addCourseToStudent,
  getCourseByStudent,
};
