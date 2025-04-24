const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.get("/volunteers", reportController.generateVolunteerReport);

module.exports = router;
