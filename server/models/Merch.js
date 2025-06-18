// models/Merch.js
const mongoose = require("mongoose");

const MerchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    org: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    merchId: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["cap", "tshirt", "hoodies"],
    },
    noOfPieces: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Merch", MerchSchema);