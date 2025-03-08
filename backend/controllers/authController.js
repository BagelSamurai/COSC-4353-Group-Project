const users = {
  "admin@example.com": { password: "admin123", role: "admin" },
  "user1@example.com": { password: "password123", role: "user" },
};

const profiles = {}; // In-memory storage

// Hash passwords (for development, use bcrypt in production)
function hashPassword(password) {
  return password; // Replace with bcrypt.hashSync(password, 10) in production
}

// Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (users[email] && users[email].password === hashPassword(password)) {
    res
      .status(200)
      .json({ message: "Login successful!", role: users[email].role });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
};

// Register
exports.register = (req, res) => {
  const { email, password } = req.body;

  if (users[email]) {
    return res.status(400).json({ message: "User already exists!" });
  }

  users[email] = { password: hashPassword(password), role: "user" };
  res.status(200).json({ message: "Registration successful!" });
};

// Profile operations
exports.getProfile = (req, res) => {
  const { email } = req.query;

  if (profiles[email]) {
    res.status(200).json(profiles[email]);
  } else {
    res.status(404).json({ message: "Profile not found." });
  }
};

exports.updateProfile = (req, res) => {
  const { email, profile_data } = req.body;
  profiles[email] = profile_data;
  res.status(200).json({ message: "Profile updated successfully!" });
};
