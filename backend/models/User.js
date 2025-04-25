const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  address1: {
    type: String,
    required: true,
    maxlength: 100
  },
  address2: {
    type: String,
    maxlength: 100
  },
  city: {
    type: String,
    required: true,
    maxlength: 100
  },
  state: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2
  },
  zipCode: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 9
  },
  skills: [{
    type: String,
    trim: true
  }],
  experienceLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  preferences: {
    type: String,
    trim: true
  },
  availability: [{
    type: Date // changed from String to Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);

/*const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  experienceLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  preferences: {
    type: String,
    trim: true
  },
  availability: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema); */