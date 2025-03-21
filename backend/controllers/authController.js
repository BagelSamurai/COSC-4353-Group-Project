const UserProfile = require("../models/UserProfile");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const UserCredentials = require("../models/UserCredentials");
const jwt = require("jsonwebtoken");

// authController.js
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserCredentials.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new UserCredentials({ email, password });
    await newUser.save();

    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserCredentials.findOne({ email });
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Profile operations
exports.getProfile = async (req, res) => {
  const { userId } = req.query;

  try {
    const profile = await UserProfile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateProfile = async (req, res) => {
  const { userId, profile_data } = req.body;

  try {
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId },
      profile_data,
      { new: true, upsert: true } // Creates profile if it doesn't exist
    );

    res
      .status(200)
      .json({ message: "Profile updated successfully!", updatedProfile });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/*const users = {
  "admin@example.com": { password: "admin123", role: "admin" },
  "user1@example.com": { password: "password123", role: "user" },
};

const profiles = {}; // In-memory storage

// Hash passwords (for development, use bcrypt in production)
function hashPassword(password) {
  return password; // Replace with bcrypt.hashSync(password, 10) in production
}

// Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (users[email] && users[email].password === hashPassword(password)) {
    res
      .status(200)
      .json({ message: "Login successful!", role: users[email].role });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
};

// Register
exports.register = (req, res) => {
  const { email, password } = req.body;

  if (users[email]) {
    return res.status(400).json({ message: "User already exists!" });
  }

  users[email] = { password: hashPassword(password), role: "user" };
  res.status(200).json({ message: "Registration successful!" });
};

// Profile operations
exports.getProfile = (req, res) => {
  const { email } = req.query;

  if (profiles[email]) {
    res.status(200).json(profiles[email]);
  } else {
    res.status(404).json({ message: "Profile not found." });
  }
};

exports.updateProfile = (req, res) => {
  const { email, profile_data } = req.body;
  profiles[email] = profile_data;
  res.status(200).json({ message: "Profile updated successfully!" });
};
*/
