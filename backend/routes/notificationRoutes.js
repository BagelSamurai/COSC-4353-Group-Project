// routes/notificationRoutes.js

const express = require("express");
const router = express.Router();

// Import the controller
const notificationController = require("../controllers/notificationController");

// Define the routes
router.get("/", notificationController.getNotifications);
router.post("/", notificationController.addNotification);

module.exports = router;
