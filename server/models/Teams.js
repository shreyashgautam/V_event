const mongoose = require('mongoose');

let counter = 1; // fallback for team ID counter

const teamSchema = new mongoose.Schema(
  {
    teamId: {
      type: String,
      unique: true,
    },
    teamName: {
      type: String,
      required: true,
      trim: true,
    },
    teamLeader: {
      type: String,
      required: true,
      trim: true,
    },
    teamMembers: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.length >= 1 && value.length <= 5;
        },
        message: 'Team must have between 1 and 5 members',
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure leader is part of members
teamSchema.pre('validate', function (next) {
  if (!this.teamMembers.includes(this.teamLeader)) {
    this.teamMembers.unshift(this.teamLeader);
  }
  next();
});

// Auto-generate teamId before saving
teamSchema.pre('save', async function (next) {
  if (!this.teamId) {
    const Team = mongoose.model('Team', teamSchema);

    const lastTeam = await Team.findOne().sort({ createdAt: -1 });
    if (lastTeam && lastTeam.teamId) {
      const lastNum = parseInt(lastTeam.teamId.replace('TEAM', '')) || 0;
      counter = lastNum + 1;
    }

    this.teamId = `TEAM${String(counter).padStart(3, '0')}`;
    counter++;
  }
  next();
});

module.exports = mongoose.model('Team', teamSchema);
