const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// Define event routes
router.post("/", eventController.createEvent);
router.get("/", eventController.getEvents);

module.exports = router;
