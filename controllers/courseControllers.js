const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllCourses = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("course").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const instructorName = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("courses")
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
  getAllCourses,
  instructorName,
};
