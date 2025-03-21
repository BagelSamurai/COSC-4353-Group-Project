const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userCredentialsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Ensures valid email format
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Enforces password length
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

// Password hashing before saving
userCredentialsSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison for login
userCredentialsSchema.methods.comparePassword = async function (
  candidatePassword
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("UserCredentials", userCredentialsSchema);

/*const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const UserCredentialsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/  // Email format validation
    },
    password: {
        type: String,
        required: true,
        minlength: 8  // Minimum 8 characters for stronger security
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
UserCredentialsSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Password comparison method
UserCredentialsSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('UserCredentials', UserCredentialsSchema);
*/
