// seedVolunteers.js
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");

async function seedVolunteers() {
  await connectDB();
  await User.deleteMany({});
  await User.insertMany([
    {
      fullName: "Alice Johnson",
      email: "alice.johnson@example.com",
      skills: ["Gardening", "First Aid"],
      experienceLevel: "Intermediate",
      availability: ["Weekends"],
    },
    {
      fullName: "Brian Lee",
      email: "brian.lee@example.com",
      skills: ["Cooking", "Organization"],
      experienceLevel: "Advanced",
      availability: ["Weekdays"],
    },
    {
      fullName: "Carla Martinez",
      email: "carla.martinez@example.com",
      skills: ["Running", "Coordination"],
      experienceLevel: "Beginner",
      availability: ["Evenings"],
    },
  ]);
  console.log("Volunteers seeded");
  mongoose.connection.close();
}

seedVolunteers();
