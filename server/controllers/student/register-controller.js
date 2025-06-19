const Register = require("../../models/Register");
const Event = require("../../models/Event");
const Team = require("../../models/Teams");
exports.registerStudentForEvent = async (req, res) => {
    try {
      const { regNo, eventId, teamId } = req.body;
  
      // 1. Find Event
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ success: false, message: "Event not found" });
      }
  
      // 2. Find Team
      const team = await Team.findOne({ teamId });
      if (!team) {
        return res.status(404).json({ success: false, message: "Team not found" });
      }
  
      // 3. Validate team size
      if (team.teamMembers.length !== event.members) {
        return res.status(400).json({ success: false, message: "Team size must match event requirement" });
      }
  
      // 4. Check if any team member is already registered for this event
      const conflictingRegistration = await Register.findOne({
        eventId,
        teamMembers: { $in: team.teamMembers }
      });
  
      if (conflictingRegistration) {
        return res.status(409).json({
          success: false,
          message: `One or more team members are already registered for this event under a different team`,
          conflictTeamId: conflictingRegistration.teamId,
        });
      }
  
      // 5. Proceed to register
      const newRegister = new Register({
        regNo,
        eventId,
        eventName: event.name,
        eventOrg: event.organisation,
        teamId: team.teamId,
        teamName: team.teamName,
        teamMembers: team.teamMembers,
      });
  
      await newRegister.save();
  
      return res.status(201).json({
        success: true,
        message: "Student registered successfully",
        data: newRegister,
      });
  
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

// ✅ Fetch all events a student has registered for
exports.getStudentRegistrations = async (req, res) => {
    try {
      const { regNo } = req.params;
  
      const registrations = await Register.find({ regNo }).populate("eventId");
  
      if (registrations.length === 0) {
        return res.status(404).json({ success: false, message: "No registrations found for this student" });
      }
  
      return res.status(200).json({ success: true, data: registrations });
    } catch (error) {
      console.error("Student registration fetch error:", error);
      return res.status(500).json({ success: false, message: "Failed to fetch registrations" });
    }
  };
  