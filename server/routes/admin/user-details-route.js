// routes/admin/adminRoutes.js

const express = require('express');
const router = express.Router();

const {
  getAllStudents,
  deleteStudent
} = require('../../controllers/admin/user-details-controller');

// GET all student users
router.get('/get', getAllStudents);

// DELETE a student by ID
router.delete('/delete/:id', deleteStudent);

module.exports = router;
