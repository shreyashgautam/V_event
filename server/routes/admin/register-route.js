const express = require("express");
const router = express.Router();
const {
  getAllRegistrations,
  getRegistrationsByEventId,
  getRegistrationsByEventName,
  deleteRegistrationById,
} = require("../../controllers/admin/register-controller");

// Existing routes
router.get("/all", getAllRegistrations);
router.get("/eventid/:eventId", getRegistrationsByEventId);
router.get("/eventname/:eventName", getRegistrationsByEventName);

// ✅ New: Delete registration by ID
router.delete("/delete/:regId", deleteRegistrationById);

module.exports = router;
