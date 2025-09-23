// GET single instrctor

const { response } = require("express");
const mongodb = require("../db/connect");
const { model } = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

// GET courses by instructor
const getCourseByInstructor = async (req, res) => {
  try {
    const instructorId = req.params.id;

    // Find the instructor
    const instructor = await mongodb
      .getDb()
      .db()
      .collection("instructor")
      .findOne({ _id: new ObjectId(instructorId) });

    if (!instructors) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    // Return only the course IDs array
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(instructors.courses || []);
  } catch (error) {
    res.status(500).json(error);
  }
};
// add course to instructor
const addCourseToInstructor = async (req, res) => {
  try {
    const instructorId = req.params.id; // Instructor id from URL
    const { courseId } = req.body;
    console.log(courseId);
    const result = await mongodb
      .getDb()
      .db()
      .collection("instructor")
      .updateOne(
        { _id: new ObjectId(instructorId) },
        { $push: { courses: courseId } }
      );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Course added to instructor" });
    } else {
      res.status(404).json({ message: "Instructor not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get single instructor
const getSingleInstructor = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("instructor")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getCourseByInstructor,
  addCourseToInstructor,
  getSingleInstructor,
};
