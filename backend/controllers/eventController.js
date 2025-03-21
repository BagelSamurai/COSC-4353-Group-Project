const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { eventName, description, location, skills, urgency, date } = req.body;

    if (!eventName || !description || !location || !date) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newEvent = new Event({
      eventName,
      description,
      location,
      skills: skills || [],
      urgency: urgency || "Medium",
      date: new Date(date)
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Error creating event.", error: error.message });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events.", error: error.message });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event.", error: error.message });
  }
};
