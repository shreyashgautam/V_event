// routes/student/merchStudentRoutes.js
const express = require("express");
const router = express.Router();
const {
  getFilteredMerch,
  getMerchDetails,
} = require("../../controllers/student/Merch-controller");

router.get("/get", getFilteredMerch);
router.get("/get/:id", getMerchDetails);

module.exports = router;
