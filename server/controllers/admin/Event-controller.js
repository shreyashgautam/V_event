const { imageUploadUtil } = require("../../helpers/cloudinary");
const Event = require("../../models/Event");

// Upload image
const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({ success: true, result });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
};

// Add Event
const addEvent = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      organisation,
      date,
      fees,
      venue,
      members,
      noOfSeats,
      type,
    } = req.body;

    // Check if event name already exists
    const existingEvent = await Event.findOne({ name });
    if (existingEvent) {
      return res
        .status(400)
        .json({ success: false, message: "Event name must be unique" });
    }

    const newEvent = new Event({
      name,
      image,
      description,
      organisation,
      date,
      fees,
      venue,
      members,
      noOfSeats,
      type,
    });

    await newEvent.save();

    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    console.error("Add event error:", error);
    res.status(500).json({ success: false, message: "Failed to add event" });
  }
};

// Get All Events
const fetchAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error("Fetch events error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch events" });
  }
};

// Edit Event
const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Check if updating to a name that already exists
    if (updatedData.name) {
      const existing = await Event.findOne({ name: updatedData.name });
      if (existing && existing._id.toString() !== id) {
        return res.status(400).json({
          success: false,
          message: "Another event with this name already exists",
        });
      }
    }

    const event = await Event.findByIdAndUpdate(id, updatedData, { new: true });

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    console.error("Edit event error:", error);
    res.status(500).json({ success: false, message: "Failed to edit event" });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete event error:", error);
    res.status(500).json({ success: false, message: "Failed to delete event" });
  }
};

module.exports = {
  handleImageUpload,
  addEvent,
  fetchAllEvents,
  editEvent,
  deleteEvent,
};
