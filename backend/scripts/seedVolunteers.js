const mongoose = require("mongoose");
const User = require("../models/User");

mongoose.connect("mongodb://localhost:27017/YOUR_DB_NAME");

const seedUsers = async () => {
  await User.deleteMany({}); // (optional) clean database

  await User.insertMany([
    {
      fullName: "Alice Johnson",
      email: "alice@example.com",
      address1: "123 Main St",
      address2: "Apt 1B",
      city: "Houston",
      state: "TX",
      zipCode: "77001",
      skills: ["First Aid", "Cooking", "Teaching"],
      experienceLevel: "Advanced",
      preferences: "Outdoor events",
      availability: ["Saturday", "Sunday"],
    },
    {
      fullName: "Bob Smith",
      email: "bob@example.com",
      address1: "456 Oak Ave",
      address2: "",
      city: "Dallas",
      state: "TX",
      zipCode: "75201",
      skills: ["Driving", "Logistics"],
      experienceLevel: "Intermediate",
      preferences: "Logistics",
      availability: ["Friday", "Saturday"],
    },
  ]);

  console.log("Users seeded successfully!");
  mongoose.disconnect();
};

seedUsers();
