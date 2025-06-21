const mongoose = require("mongoose");

const BuySchema = new mongoose.Schema(
  {
    regNo: {
      type: String,
      required: true,
      trim: true,
    },
    merchId: {
      type: String,
      required: true,
    },
    merchName: {
      type: String,
      required: true,
    },
    merchOrg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError in development
module.exports = mongoose.models.Buy || mongoose.model("Buy", BuySchema);
