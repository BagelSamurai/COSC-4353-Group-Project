const UserProfile = require('../models/UserProfile');
const { body, validationResult } = require('express-validator');


// Create a new profilenpm

exports.createProfile = async (req, res) => {
    try {
        const profileData = req.body;
        const newProfile = new UserProfile(profileData);
        await newProfile.save();
        res.status(201).json({ message: 'Profile created successfully' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid data format', details: error.errors });
        }
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getProfiles = async (req, res) => {
    try {
        const profile = await UserProfile.findOne({ userId: req.user.id });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateProfile = [
    // Validation rules
    body('profile_data.fullName').optional().isLength({ min: 3 }).withMessage('Full name must be at least 3 characters long'),
    body('profile_data.contactNumber').optional().isNumeric().isLength({ min: 10, max: 15 }).withMessage('Contact number must be between 10-15 digits'),
    body('profile_data.zipCode').optional().isPostalCode('US').withMessage('Invalid zip code format'),

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

            res.status(200).json({ message: "Profile updated successfully!", updatedProfile });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
];



/*let profiles = []; // In-memory storage

// Create a new profile
exports.createProfile = (req, res) => {
  const newProfile = { id: profiles.length + 1, ...req.body };
  profiles.push(newProfile);
  res
    .status(201)
    .json({ message: "Profile saved successfully", profile: newProfile });
};

// Get all profiles
exports.getProfiles = (req, res) => {
  res.status(200).json(profiles);
};*/
