const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock Database
const users = {
  "admin@example.com": { password: "admin123", role: "admin" },
  "user1@example.com": { password: "password123", role: "user" }
};

const profiles = {};

// Hash passwords (for development, use plain passwords)
function hashPassword(password) {
  return password; // Use a proper hashing function like bcrypt in production
}

// Root route to prevent "Cannot GET /" error
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Volunteer Management System API!');
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (users[email] && users[email].password === hashPassword(password)) {
    const role = users[email].role;
    res.status(200).json({ message: "Login successful!", role });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
});

// Register Route
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (users[email]) {
    return res.status(400).json({ message: "User already exists!" });
  }

  // Save the user to the mock database (hashed password)
  users[email] = { password: hashPassword(password), role: "user" };
  res.status(200).json({ message: "Registration successful!" });
});

// Profile Route - GET to retrieve profile, POST to update
app.route('/profile')
  .get((req, res) => {
    const { email } = req.query;

    if (profiles[email]) {
      res.status(200).json(profiles[email]);
    } else {
      res.status(404).json({ message: "Profile not found." });
    }
  })
  .post((req, res) => {
    const { email, profile_data } = req.body;

    profiles[email] = profile_data;
    res.status(200).json({ message: "Profile updated successfully!" });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
