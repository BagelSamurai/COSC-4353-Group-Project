const request = require("supertest");
const express = require("express");
const app = express();

// Import the routes correctly
const notificationRoutes = require("../routes/notificationRoutes");

// Middleware and routes
app.use(express.json());
app.use("/api/notifications", notificationRoutes);

describe("POST /api/notifications", () => {
  it("should return 201 and the created notification when data is valid", async () => {
    const notificationData = {
      message: "Event reminder: Charity Run",
    };

    const response = await request(app)
      .post("/api/notifications")
      .send(notificationData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.message).toBe(notificationData.message);
  });

  it("should return 400 if data is invalid (message missing)", async () => {
    const notificationData = {}; // Missing message field

    const response = await request(app)
      .post("/api/notifications")
      .send(notificationData);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Message is required");
  });
});

describe("GET /api/notifications", () => {
  it("should return an array of notifications", async () => {
    const response = await request(app).get("/api/notifications");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0); // Ensure there are some notifications
  });
});
