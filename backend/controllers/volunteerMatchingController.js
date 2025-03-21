const Event = require('../models/Event');
const User = require('../models/User');

// Calculate match score between a user and an event
const calculateMatchScore = (user, event) => {
  let score = 0;
  const maxScore = 100;

  // Calculate skill match (50% of total score)
  const userSkills = new Set(user.skills.map(skill => skill.toLowerCase()));
  const eventSkills = new Set(event.skills.map(skill => skill.toLowerCase()));
  const matchingSkills = [...userSkills].filter(skill => eventSkills.has(skill));
  const skillScore = (matchingSkills.length / event.skills.length) * 50;
  score += skillScore;

  // Add experience bonus (20% of total score)
  const experienceBonus = {
    'Beginner': 10,
    'Intermediate': 15,
    'Advanced': 20
  };
  score += experienceBonus[user.experienceLevel] || 0;

  // Add availability bonus (30% of total score)
  const eventDate = new Date(event.date);
  const dayOfWeek = eventDate.toLocaleDateString('en-US', { weekday: 'long' });
  if (user.availability.includes(dayOfWeek)) {
    score += 30;
  }

  return Math.min(Math.round(score), maxScore);
};

// Get matching volunteers for an event
exports.getMatchingVolunteers = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Get all users (in a real app, you'd want to filter this)
    const users = await User.find();

    // Calculate matches
    const matchedVolunteers = users.map(user => {
      const matchScore = calculateMatchScore(user, event);
      const matchingSkills = user.skills.filter(skill => 
        event.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
      );

      return {
        userId: user._id,
        userProfile: {
          fullName: user.fullName,
          experienceLevel: user.experienceLevel,
          preferences: user.preferences,
          availability: user.availability
        },
        matchScore,
        matchingSkills
      };
    });

    // Sort by match score and filter out low matches
    const filteredMatches = matchedVolunteers
      .filter(match => match.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({ matchedVolunteers: filteredMatches });
  } catch (error) {
    res.status(500).json({ message: "Error finding matches.", error: error.message });
  }
}; 