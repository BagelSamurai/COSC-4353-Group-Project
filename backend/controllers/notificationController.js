// Sample notifications
const notifications = [
  { id: 1, message: "New volunteer signed up!" },
  { id: 2, message: "Event has been updated." },
  { id: 3, message: "You have a new message." },
];

// Get notifications
exports.getNotifications = (req, res) => {
  res.json(notifications);
};

// Add a new notification
exports.addNotification = (req, res) => {
  const { message } = req.body;

  // Validate input data
  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message is required" });
  }

  // Create new notification
  const newNotification = { id: notifications.length + 1, message };
  notifications.push(newNotification);

  // Return created notification
  res.status(201).json(newNotification);
};
