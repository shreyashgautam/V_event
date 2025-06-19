const Register = require("../../models/Register");
const Event = require("../../models/Event");

// ✅ Get all registrations
exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Register.find().populate("eventId");
    return res.status(200).json({ success: true, data: registrations });
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch registrations" });
  }
};

// ✅ Get registrations by event ID
exports.getRegistrationsByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;

    const registrations = await Register.find({ eventId }).populate("eventId");

    if (registrations.length === 0) {
      return res.status(404).json({ success: false, message: "No registrations found for this event ID" });
    }

    return res.status(200).json({ success: true, data: registrations });
  } catch (error) {
    console.error("Event ID fetch error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch registrations by event ID" });
  }
};

// ✅ Get registrations by event name
exports.getRegistrationsByEventName = async (req, res) => {
  try {
    const { eventName } = req.params;

    const event = await Event.findOne({ name: eventName });
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    const registrations = await Register.find({ eventId: event._id }).populate("eventId");

    if (registrations.length === 0) {
      return res.status(404).json({ success: false, message: "No registrations found for this event name" });
    }

    return res.status(200).json({ success: true, data: registrations });
  } catch (error) {
    console.error("Event name fetch error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch registrations by event name" });
  }
};


// ✅ Delete a registration by ID
exports.deleteRegistrationById = async (req, res) => {
    try {
      const { regId } = req.params;
  
      const deleted = await Register.findByIdAndDelete(regId);
  
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Registration not found" });
      }
  
      return res.status(200).json({ success: true, message: "Registration deleted successfully" });
    } catch (error) {
      console.error("Delete registration error:", error);
      return res.status(500).json({ success: false, message: "Failed to delete registration" });
    }
  };
  
