import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import app from '../index.js'; // Ensure index.js exports the app instance
import Event from '../models/Events.js';

let mongoServer;
let server;

beforeAll(async () => {
    // Start MongoMemoryServer and get the Mongo URI
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri(); // Get URI for in-memory MongoDB
  
    // Ensure mongoUri is defined before trying to connect
    if (!mongoUri) {
      throw new Error("MongoDB URI is undefined. MongoMemoryServer might not have started properly.");
    }
  
    // Check if mongoose is already connected, to avoid multiple connections
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  
    // Set a custom port for testing
    process.env.PORT = 5001;
  
    // Start the server with the custom port for testing
    server = app.listen(process.env.PORT, () => {
      console.log(`Test server running on port ${process.env.PORT}`);
    });
  });
  

  // Set a custom port for testing
  process.env.PORT = 5001;

  // Start the server with the custom port for testing
  server = app.listen(process.env.PORT, () => {
    console.log(`Test server running on port ${process.env.PORT}`);
  });
});

afterAll(async () => {
  // Disconnect from MongoDB and stop the MongoMemoryServer
  if (mongoose.connection.readyState === 1) { // If connected
    await mongoose.disconnect(); // Close the MongoDB connection
  }
  await mongoServer.stop(); // Stop the MongoMemoryServer instance

  // Close the server after tests to free up the port
  if (server) {
    server.close();
  }
});

describe('Event API Tests', () => {
  let eventData;

  beforeEach(() => {
    // Sample event data for the tests
    eventData = {
      name: 'Sample Event',
      date: '2025-03-10',
      location: 'New York',
      requiredSkills: ['JavaScript', 'Node.js'],
      urgency: 'High',
    };
  });

  it('Should create a new event successfully', async () => {
    const response = await request(app).post('/api/events').send(eventData);

    // Check if status code is 201 (Created)
    expect(response.status).toBe(201);
    // Check if the response body contains the _id field
    expect(response.body).toHaveProperty('_id');
    // Check if the values match the event data
    expect(response.body.name).toBe(eventData.name);
    expect(response.body.date).toBe(eventData.date);
  });

  it('Should not create an event with missing fields (e.g. name)', async () => {
    const { name, ...invalidData } = eventData; // Remove the name field
    const response = await request(app).post('/api/events').send(invalidData);

    // Expect the status to be 400 (Bad Request) due to validation errors
    expect(response.status).toBe(400);
    // Check if validation error exists for the 'name' field
    expect(response.body.errors).toHaveProperty('name');
  });

  it('Should validate event schema (missing required fields)', async () => {
    const invalidEvent = { ...eventData, name: undefined }; // Missing name field
    const response = await request(app).post('/api/events').send(invalidEvent);

    // Expect the status to be 400 (Bad Request) due to the missing 'name'
    expect(response.status).toBe(400);
    // Check if validation error exists for the 'name' field
    expect(response.body.errors).toHaveProperty('name');
  });

  it('Should not create an event with an invalid date format', async () => {
    const invalidDateEvent = { ...eventData, date: 'invalid-date' }; // Invalid date format
    const response = await request(app).post('/api/events').send(invalidDateEvent);

    // Expect the status to be 400 (Bad Request) due to the invalid date
    expect(response.status).toBe(400);
    // Ensure the validation error for the 'date' field exists
    expect(response.body.errors).toHaveProperty('date');
  });

  it('Should not create an event with an invalid urgency value', async () => {
    const invalidUrgencyEvent = { ...eventData, urgency: 'InvalidUrgency' }; // Invalid urgency value
    const response = await request(app).post('/api/events').send(invalidUrgencyEvent);

    // Expect the status to be 400 (Bad Request) due to the invalid urgency
    expect(response.status).toBe(400);
    // Ensure the validation error for the 'urgency' field exists
    expect(response.body.errors).toHaveProperty('urgency');
  });
});
