const mongoose = require("mongoose");
const Event = require("./Event");

const RegisterSchema = new mongoose.Schema(
  {
    regNo: {
      type: String,
      required: true,
      trim: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    eventOrg: {
      type: String,
      required: true,
    },
    teamId: {
      type: String,
      required: true,
    },
    teamName: {
      type: String,
      required: true,
    },
    teamMembers: {
      type: [String],
      required: true,
      validate: {
        validator: async function (members) {
          const event = await Event.findById(this.eventId);
          return event && members.length === event.members;
        },
        message: "Team size must match event member requirement",
      },
    },
  },
  { timestamps: true }
);

// Prevent duplicate regNo for same event
RegisterSchema.index({ regNo: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model("Register", RegisterSchema);
