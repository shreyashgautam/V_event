const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Enforces uniqueness of event name
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    organisation: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    members: {
      type: Number,
      required: true,
    },
    noOfSeats: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Technical", "Non-Technical"], // restrict to either value
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
