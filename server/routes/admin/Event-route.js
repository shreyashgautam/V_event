const express = require("express");

const {
  handleImageUpload,
  addEvent,
  editEvent,
  fetchAllEvents,
  deleteEvent,
} = require("../../controllers/admin/Event-controller");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

// Upload image for event
router.post("/upload-image", upload.single("my_file"), handleImageUpload);

// Add new event
router.post("/add", addEvent);

// Edit event
router.put("/edit/:id", editEvent);

// Delete event
router.delete("/delete/:id", deleteEvent);

// Fetch all events
router.get("/get", fetchAllEvents);

module.exports = router;
