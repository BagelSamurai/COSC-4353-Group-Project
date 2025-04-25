const Event = require("../models/Event");
const User = require("../models/User");

// Calculate match score between a user and an event
const calculateMatchScore = (user, event) => {
  let score = 0;
  const maxScore = 100;

  // Skill match (50%)
  const userSkills = new Set(
    (user.skills || []).map((skill) => skill.toLowerCase())
  );
  const eventSkills = new Set(
    (event.skills || []).map((skill) => skill.toLowerCase())
  );
  const matchingSkills = [...userSkills].filter((skill) =>
    eventSkills.has(skill)
  );
  const skillScore = (matchingSkills.length / event.skills.length) * 50;
  score += skillScore;

  // Experience bonus (20%)
  const experienceBonus = {
    Beginner: 10,
    Intermediate: 15,
    Advanced: 20,
  };
  score += experienceBonus[user.experienceLevel] || 0;

  // Availability bonus (30%)
  const eventDate = new Date(event.date);
  const dayOfWeek = eventDate.toLocaleDateString("en-US", { weekday: "long" });
  if ((user.availability || []).includes(dayOfWeek)) {
    score += 30;
  }

  return Math.min(Math.round(score), maxScore);
};

// GET /api/volunteer-matching/events/:eventId/matches
exports.getMatchingVolunteers = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    const users = await User.find();

    const matchedVolunteers = users.map((user) => {
      const matchScore = calculateMatchScore(user, event);
      const matchingSkills = user.skills.filter((skill) =>
        event.skills.map((s) => s.toLowerCase()).includes(skill.toLowerCase())
      );

      return {
        userId: user._id,
        userProfile: {
          fullName: user.fullName,
          experienceLevel: user.experienceLevel,
          preferences: user.preferences,
          availability: user.availability,
        },
        matchScore,
        matchingSkills,
      };
    });

    const filteredMatches = matchedVolunteers
      .filter((match) => match.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({ matchedVolunteers: filteredMatches });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding matches.", error: error.message });
  }
};

// POST /api/volunteer-matching/update-match
exports.updateMatchStatus = async (req, res) => {
  const { userId, eventId, status } = req.body;

  if (!userId || !eventId || !status) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Log or save decision (add DB saving later if needed)
    console.log(`User ${userId} matched to Event ${eventId} => ${status}`);
    res.status(200).json({ message: `Match ${status} recorded.` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating match status.", error: error.message });
  }
};
