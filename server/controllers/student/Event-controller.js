
// controllers/student/eventStudentController.js
const Event = require("../../models/Event");

const getFilteredEvents = async (req, res) => {
  try {
    const { organisation = [], sortBy = "date-newest" } = req.query;

    let filters = {};
    if (organisation.length) {
      filters.organisation = { $in: organisation.split(",") };
    }

    let sort = {};
    switch (sortBy) {
      case "date-newest":
        sort.date = -1;
        break;
      case "date-oldest":
        sort.date = 1;
        break;
      case "fees-lowtohigh":
        sort.fees = 1;
        break;
      case "fees-hightolow":
        sort.fees = -1;
        break;
      default:
        sort.date = -1;
        break;
    }

    const events = await Event.find(filters).sort(sort);
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error("Filter events error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch events" });
  }
};

const getEventDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    console.error("Get event details error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch event details" });
  }
};

module.exports = { getFilteredEvents, getEventDetails };