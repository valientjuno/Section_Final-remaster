const express = require("express");
const router = express.Router();

const instructorController = require("../controllers/instructorController");

router.put("/addcourse/:id", instructorController.addCourseToInstructor);

router.get("/:id/courses", instructorController.getCourseByInstructor);

router.get("/:id", instructorController.getSingleInstructor);

module.exports = router;
