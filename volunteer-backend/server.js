const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/profilesDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Profile Schema and Model
const profileSchema = new mongoose.Schema({
  fullName: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  skills: [String],
  preferences: String,
  availability: [Date],
});

const Profile = mongoose.model('Profile', profileSchema);

// POST route to store profiles
app.post('/profiles', async (req, res) => {
  try {
    const profileData = req.body;
    const newProfile = new Profile(profileData);
    await newProfile.save();
    res.status(201).json({ message: 'Profile saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save profile' });
  }
});

// GET route to view stored profiles
app.get('/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve profiles' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
