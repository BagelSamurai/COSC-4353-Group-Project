// seedEvents.js
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Event = require("../models/Event");

async function seedEvents() {
  await connectDB();
  await Event.deleteMany({});
  await Event.insertMany([
    {
      eventName: "Tree Planting",
      description: "Planting trees in the community park.",
      location: "Riverside Park",
      skills: ["Gardening", "Teamwork"],
      urgency: "Low",
      date: new Date("2025-05-20"),
    },
    {
      eventName: "Beach Cleanup",
      description: "Cleaning shoreline litter.",
      location: "Sunny Beach",
      skills: ["Organization", "Environmental Awareness"],
      urgency: "Medium",
      date: new Date("2025-06-10"),
    },
    {
      eventName: "Blood Donation Camp",
      description: "Blood donation drive.",
      location: "City Hospital",
      skills: ["Medical Assistance", "Coordination"],
      urgency: "High",
      date: new Date("2025-07-05"),
    },
  ]);
  console.log("Events seeded");
  mongoose.connection.close();
}

seedEvents();
