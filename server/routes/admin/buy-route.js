const express = require("express");
const router = express.Router();
const {
  getAllBuys,
  getBuysByMerchId,
  deleteBuyById,
} = require("../../controllers/admin/buy-controller");

// ✅ Get all merch purchases
router.get("/all", getAllBuys);

// ✅ Get purchases by merchId
router.get("/merchid/:merchId", getBuysByMerchId);

// ✅ Delete a merch purchase by ID
router.delete("/delete/:buyId", deleteBuyById);

module.exports = router;
