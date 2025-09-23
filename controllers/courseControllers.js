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

module.exports = {
  getAllCourses,
};
