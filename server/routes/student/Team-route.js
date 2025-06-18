const express = require('express');
const router = express.Router();
const teamController = require('../../controllers/student/Team-controller');

// @route   POST /api/student/team/create
// @desc    Create a team
router.post('/create', teamController.createTeam);

// @route   GET /api/student/team/leader/:regno
// @desc    Get all teams created by a student (leader)
router.get('/leader/:regno', teamController.getTeamsByLeader);

// @route   DELETE /api/student/team/:teamId
// @desc    Delete a team (only if leader)
// Pass regno in body
router.delete('/:teamId', teamController.deleteTeam);

module.exports = router;
