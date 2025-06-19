// controllers/admin/adminController.js

const User = require('../../models/User');

// GET all students
const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Get all students error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch students" });
  }
};

// DELETE a student by ID
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findOneAndDelete({ _id: id, role: 'student' });

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "Student not found or not a student" });
    }

    res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    console.error("Delete student error:", error);
    res.status(500).json({ success: false, message: "Failed to delete student" });
  }
};

module.exports = { getAllStudents, deleteStudent };
