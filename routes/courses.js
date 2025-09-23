const express = require("express");
const router = express.Router();
const courseControllers = require("../controllers/courseControllers");

router.get("/courses", courseControllers.getAllCourses);
router.get("/instructor", courseControllers.instructorName);
module.exports = router;
