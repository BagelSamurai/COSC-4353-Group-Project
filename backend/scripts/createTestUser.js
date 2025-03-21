require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const connectDB = require("../config/db"); // Adjust the path as needed
const UserCredentials = require("../models/UserCredentials");

const adminUser = {
  email: "admin@example.com",
  password: "Test@1234", // Use a secure password in production
  role: "admin",
};

async function createAdminUser() {
  try {
    // Connect to MongoDB using the centralized connection function
    await connectDB();
    console.log("Connected to MongoDB");

    // Check if the admin user already exists
    const existingUser = await UserCredentials.findOne({
      email: adminUser.email,
    });
    if (existingUser) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create new admin user
    const user = new UserCredentials(adminUser);
    await user.save();
    console.log("Admin user created successfully:", user);

    // Close the connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

createAdminUser();
