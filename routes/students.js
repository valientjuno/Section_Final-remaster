const express = require("express");
const router = express.Router();
const studentController = require("../controllers/index");

// CRUD routes
router.post("/", studentController.createStudent);
router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getSingleStudent);
router.put("/:id", studentController.updateStudent); // ✅ Added update route
router.delete("/delete/:id", studentController.deleteStudent);

// Course-specific routes
router.put("/addcourse/:id", studentController.addCourseToStudent);
router.get("/:id/courses", studentController.getCourseByStudent);

module.exports = router;
