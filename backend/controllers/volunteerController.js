// controllers/volunteerController.js

const User = require("../models/User");

// Get volunteer history from MongoDB
exports.getVolunteerHistory = async (req, res) => {
  try {
    const volunteerHistory = await User.find({});
    res.json(volunteerHistory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
