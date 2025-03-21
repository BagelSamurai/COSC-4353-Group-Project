// config/db.js
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Use the connection string from your environment variables or fallback to a default local DB
    const mongoURI =
      process.env.MONGO_URI || "mongodb://localhost:27017/your_default_db";

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
