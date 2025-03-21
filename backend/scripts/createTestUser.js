const mongoose = require('mongoose');
const User = require('../models/User');

const testUser = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  skills: ["Teaching", "First Aid", "Event Planning", "Public Speaking"],
  experienceLevel: "Intermediate",
  preferences: "Prefers weekend events and outdoor activities",
  availability: ["Saturday", "Sunday", "Monday"]
};

async function createTestUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/volunteer_management');
    console.log('Connected to MongoDB');

    // Check if user already exists
    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      console.log('Test user already exists');
      process.exit(0);
    }

    // Create new user
    const user = new User(testUser);
    await user.save();
    console.log('Test user created successfully:', user);

    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
}

createTestUser(); 