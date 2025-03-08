let events = []; // In-memory storage for events

// Create a new event
exports.createEvent = (req, res) => {
  try {
    const { eventName, description, location, skills, urgency, date } =
      req.body;

    if (!eventName || !description || !location || !date) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newEvent = {
      id: events.length + 1,
      eventName,
      description,
      location,
      skills: skills || [],
      urgency: urgency || "Medium",
      date,
    };

    events.push(newEvent);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Error creating event.", error });
  }
};

// Get all events
exports.getEvents = (req, res) => {
  res.status(200).json(events);
};
