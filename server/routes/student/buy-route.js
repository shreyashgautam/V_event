const express = require("express");
const router = express.Router();
const {
  buyMerch,
  getStudentBuys
} = require("../../controllers/student/buy-controller");

// ✅ POST: Buy a merch item
router.post("/buy", buyMerch);

// ✅ GET: Fetch all merch purchases made by a student using regNo
router.get("/my-buys/:regNo", getStudentBuys);

module.exports = router;
