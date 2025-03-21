// routes/volunteerHistoryRoutes.js
const express = require("express");
const router = express.Router();
const VolunteerHistory = require("../models/VolunteerHistory"); // Make sure this model exists

// GET all volunteer history records
router.get("/", async (req, res) => {
  try {
    const history = await VolunteerHistory.find();
    res.json(history);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving volunteer history", error });
  }
});

module.exports = router;
