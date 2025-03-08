let profiles = []; // In-memory storage

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
};
