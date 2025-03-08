const request = require("supertest");
const express = require("express");
const app = express();

// Import the routes
const eventRoutes = require("../routes/eventRoutes");

// Middleware and routes
app.use(express.json());
app.use("/api/events", eventRoutes);

describe("POST /api/events", () => {
  it("should create a new event and return it", async () => {
    const eventData = {
      eventName: "Beach Cleanup",
      description: "Cleaning up litter on the beach.",
      location: "Miami Beach",
      skills: ["Teamwork", "Environmental Awareness"],
      urgency: "High",
      date: "2025-04-22",
    };

    const response = await request(app).post("/api/events").send(eventData);

    expect(response.status).toBe(201);
    expect(response.body.eventName).toBe(eventData.eventName);
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request(app).post("/api/events").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing required fields.");
  });
});

describe("GET /api/events", () => {
  it("should return an array of events", async () => {
    const response = await request(app).get("/api/events");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
