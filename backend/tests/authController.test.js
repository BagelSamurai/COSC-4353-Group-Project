const request = require("supertest");
const express = require("express");
const app = express();

// Import the routes
const authRoutes = require("../routes/authRoutes");

// Middleware and routes
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("POST /api/auth/register", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "test123",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Registration successful!");
  });

  it("should not allow duplicate registration", async () => {
    await request(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "test123",
    });

    const response = await request(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "test123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already exists!");
  });
});

describe("POST /api/auth/login", () => {
  it("should login with correct credentials", async () => {
    await request(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "test123",
    });

    const response = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "test123",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful!");
  });

  it("should return an error for invalid credentials", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "wrong@example.com",
      password: "wrongpass",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid email or password");
  });
});

describe("GET /api/auth/profile", () => {
  it("should return 404 if profile not found", async () => {
    const response = await request(app)
      .get("/api/auth/profile")
      .query({ email: "nonexistent@example.com" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Profile not found.");
  });

  it("should return a profile if it exists", async () => {
    await request(app)
      .post("/api/auth/profile")
      .send({
        email: "test@example.com",
        profile_data: { fullName: "John Doe" },
      });

    const response = await request(app)
      .get("/api/auth/profile")
      .query({ email: "test@example.com" });

    expect(response.status).toBe(200);
    expect(response.body.fullName).toBe("John Doe");
  });
});
