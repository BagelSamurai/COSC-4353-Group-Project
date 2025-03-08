const request = require("supertest");
const express = require("express");
const app = express();

// Import the routes
const volunteerRoutes = require("../routes/volunteerRoutes");
const eventRoutes = require("../routes/eventRoutes");

// Middleware and routes
app.use(express.json());
app.use("/api/volunteer-history", volunteerRoutes);
app.use("/api/events", eventRoutes);

describe("Volunteer Matching API", () => {
  describe("GET /api/volunteer-history", () => {
    it("should return a list of volunteer events", async () => {
      const response = await request(app).get("/api/volunteer-history");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0); // Ensure events exist
    });
  });

  describe("POST /api/events", () => {
    it("should create a new event and return it", async () => {
      const eventData = {
        eventName: "Community Cleanup",
        description: "Cleaning up the local park",
        location: "City Park",
        skills: ["Teamwork", "Organizing"],
        urgency: "High",
        date: "2025-06-10",
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

  describe("Volunteer Matching Logic", () => {
    it("should find volunteers with required skills and availability", async () => {
      // Simulating volunteer matching logic
      const volunteers = [
        {
          id: 1,
          name: "John Doe",
          skills: ["Organizing"],
          preferences: "Day",
          experienceLevel: "Intermediate",
          availability: ["Monday"],
        },
        {
          id: 2,
          name: "Jane Smith",
          skills: ["Cooking", "First Aid"],
          preferences: "Evening",
          experienceLevel: "Expert",
          availability: ["Saturday"],
        },
      ];

      const matchedVolunteers = volunteers.filter(
        (volunteer) =>
          volunteer.skills.includes("Organizing") &&
          volunteer.availability.includes("Monday")
      );

      expect(matchedVolunteers.length).toBe(1);
      expect(matchedVolunteers[0].name).toBe("John Doe");
    });

    it("should return an empty array when no matches are found", () => {
      const volunteers = [
        {
          id: 1,
          name: "John Doe",
          skills: ["Organizing"],
          preferences: "Day",
          experienceLevel: "Intermediate",
          availability: ["Monday"],
        },
      ];

      const matchedVolunteers = volunteers.filter(
        (volunteer) =>
          volunteer.skills.includes("Cooking") &&
          volunteer.availability.includes("Saturday")
      );

      expect(matchedVolunteers.length).toBe(0);
    });
  });
});
