const UserProfile = require("../models/UserProfile");
const { body, validationResult } = require("express-validator");

// Create a new profile
exports.createProfile = async (req, res) => {
  try {
    const { userId, profile_data } = req.body;

    if (!userId || !profile_data) {
      return res.status(400).json({ error: "Missing userId or profile data." });
    }

    const newProfile = new UserProfile({
      userId,
      ...profile_data,
    });

    await newProfile.save();
    res.status(201).json({ message: "Profile created successfully!" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Invalid data format", details: error.errors });
    }
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Get a single profile (based on logged-in userId)
exports.getProfiles = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found." });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update an existing profile
exports.updateProfile = [
  // Validation rules
  body("profile_data.fullName")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters long"),
  body("profile_data.address1")
    .exists()
    .isLength({ max: 100 })
    .withMessage("Address 1 must be 100 characters or less"),
  body("profile_data.address2")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Address 2 must be 100 characters or less"),
  body("profile_data.city")
    .exists()
    .isLength({ max: 100 })
    .withMessage("City must be 100 characters or less"),
  body("profile_data.state")
    .exists()
    .isLength({ min: 2, max: 2 })
    .withMessage("State code must be exactly 2 characters"),
  body("profile_data.zipCode")
    .exists()
    .isPostalCode("US")
    .withMessage("Invalid zip code format"),
  body("profile_data.skills")
    .isArray({ min: 1 })
    .withMessage("Skills must be an array"),
  body("profile_data.availability")
    .isArray({ min: 1 })
    .withMessage("Availability must be an array of dates or days"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, profile_data } = req.body;

    try {
      const updatedProfile = await UserProfile.findOneAndUpdate(
        { userId },
        profile_data,
        { new: true, upsert: true }
      );

      res
        .status(200)
        .json({ message: "Profile updated successfully!", updatedProfile });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
];
