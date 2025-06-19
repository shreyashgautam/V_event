const express = require("express");
const router = express.Router();
const {
  registerStudentForEvent,
  getStudentRegistrations
} = require("../../controllers/student/register-controller");

// POST: Register student in an event
router.post("/register", registerStudentForEvent);

// GET: Fetch all events registered by a specific student using regNo
router.get("/registrations/:regNo", getStudentRegistrations);


module.exports = router;
