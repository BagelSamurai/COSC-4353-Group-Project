// routes/volunteerRoutes.js

const express = require("express");
const router = express.Router();

// Import the controller
const volunteerController = require("../controllers/volunteerController");

// Define the route to get volunteer history
router.get("/", volunteerController.getVolunteerHistory);

module.exports = router;
