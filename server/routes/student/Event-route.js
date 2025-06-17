const express = require("express");

const {
  getFilteredEvents,
  getEventDetails,
} = require("../../controllers/student/Event-controller");

const router = express.Router();

// Get filtered events (by future filters like org, fee range, etc.)
router.get("/get", getFilteredEvents);

// Get details of a single event
router.get("/get/:id", getEventDetails);

module.exports = router;
