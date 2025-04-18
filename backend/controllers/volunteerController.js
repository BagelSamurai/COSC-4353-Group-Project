// controllers/volunteerController.js

// Sample volunteer history data
const volunteerHistory = [
  {
    id: 1,
    eventName: "Charity Run",
    eventDescription: "A running event for charity.",
    location: "Central Park",
    requiredSkills: ["Running", "First Aid"],
    urgency: "High",
    eventDate: "2025-03-10",
    participationStatus: "Confirmed",
  },
  {
    id: 2,
    eventName: "Food Drive",
    eventDescription: "Collecting food for the needy.",
    location: "Community Center",
    requiredSkills: ["Organization", "Cooking"],
    urgency: "Medium",
    eventDate: "2025-04-15",
    participationStatus: "Pending",
  },
];

// Get volunteer history
exports.getVolunteerHistory = (req, res) => {
  res.json(volunteerHistory);
};
