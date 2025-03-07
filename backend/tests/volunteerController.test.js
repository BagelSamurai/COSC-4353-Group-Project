const request = require("supertest");
const express = require("express");
const app = express();

// Import the routes
const volunteerRoutes = require("../routes/volunteerRoutes");

// Middleware and routes
app.use(express.json());
app.use("/api/volunteer-history", volunteerRoutes);

describe("GET /api/volunteer-history", () => {
  it("should return an array of volunteer history", async () => {
    const response = await request(app).get("/api/volunteer-history");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0); // Ensure there are some events
  });
});
