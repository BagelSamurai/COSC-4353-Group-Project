const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

// Middleware to handle CORS and JSON responses
app.use(cors());
app.use(express.json());

// Import routes
const volunteerRoutes = require("./routes/volunteerRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Use routes
app.use("/api/volunteer-history", volunteerRoutes);
app.use("/api/notifications", notificationRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
