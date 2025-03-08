const request = require("supertest");
const express = require("express");
const app = express();

// Import the routes
const profileRoutes = require("../routes/profileRoutes");

// Middleware and routes
app.use(express.json());
app.use("/api/profiles", profileRoutes);

describe("POST /api/profiles", () => {
  it("should create a new profile and return it", async () => {
    const profileData = {
      fullName: "John Doe",
      address1: "123 Main St",
      address2: "Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      skills: ["Cooking", "First Aid"],
      preferences: "Evenings",
      availability: ["2025-03-10T12:00:00Z"],
    };

    const response = await request(app).post("/api/profiles").send(profileData);

    expect(response.status).toBe(201);
    expect(response.body.profile.fullName).toBe(profileData.fullName);
  });
});

describe("GET /api/profiles", () => {
  it("should return an array of profiles", async () => {
    const response = await request(app).get("/api/profiles");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
