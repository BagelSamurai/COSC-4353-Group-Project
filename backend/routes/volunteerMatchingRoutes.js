const express = require("express");
const router = express.Router();
const volunteerMatchingController = require("../controllers/volunteerMatchingController");

// Get matching volunteers for an event
router.get("/events/:eventId/matches", volunteerMatchingController.getMatchingVolunteers);

module.exports = router; 