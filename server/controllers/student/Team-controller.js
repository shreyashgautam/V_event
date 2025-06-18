const Team = require('../../models/Teams');
const User = require('../../models/User'); // Make sure this path is correct

// Create a new team
exports.createTeam = async (req, res) => {
  try {
    const { teamName, teamLeader, teamMembers } = req.body;

    if (!teamName || !teamLeader || !Array.isArray(teamMembers)) {
      return res.status(400).json({ error: 'All fields are required and teamMembers must be an array.' });
    }

    if (teamMembers.length < 1 || teamMembers.length > 5) {
      return res.status(400).json({ error: 'Team must have between 1 to 5 members.' });
    }

    // Validate that the leader exists in User DB
    const leaderExists = await User.findOne({ regNo: teamLeader });
    if (!leaderExists) {
      return res.status(404).json({ error: 'Team leader regno not found in User database.' });
    }

    // Validate that all teamMembers exist in User DB
    const memberCheck = await User.find({ regNo: { $in: teamMembers } });

    if (memberCheck.length !== teamMembers.length) {
      return res.status(400).json({ error: 'One or more team member regnos not found in User database.' });
    }

    const team = new Team({
      teamName,
      teamLeader,
      teamMembers,
    });

    await team.save();

    res.status(201).json({
      message: 'Team created successfully',
      team,
    });
  } catch (err) {
    console.error('Error creating team:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all teams created by a particular leader (RegNo)
exports.getTeamsByLeader = async (req, res) => {
  try {
    const { regno } = req.params;

    const teams = await Team.find({ teamLeader: regno });

    res.status(200).json({
      message: `Teams created by ${regno}`,
      count: teams.length,
      teams,
    });
  } catch (err) {
    console.error('Error fetching teams:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a team by ID (only by leader)
exports.deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { regno } = req.body;

    const team = await Team.findOne({ teamId });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    if (team.teamLeader !== regno) {
      return res.status(403).json({ error: 'You are not authorized to delete this team' });
    }

    await Team.deleteOne({ teamId });

    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (err) {
    console.error('Error deleting team:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
