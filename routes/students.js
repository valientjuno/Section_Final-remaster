const express = require("express");
const router = express.Router();

const studentController = require("../controllers/index");

router.put("/addcourse/:id", studentController.addCourseToStudent);

router.get("/:id/courses", studentController.getCourseByStudent);
router.get("/:id", studentController.getSingleStudent);

router.post("/", studentController.createStudent);
router.get("/", studentController.getAllStudents);

router.delete("/delete/:id", studentController.deleteStudent);

module.exports = router;
