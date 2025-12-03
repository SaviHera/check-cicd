const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// ============================================
// API ROUTES
// ============================================

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    message: "Firebase Functions API is running! 🚀"
  });
});

// Get all users (mock data)
app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "user" }
  ];
  res.json({
    success: true,
    count: users.length,
    data: users
  });
});

// Get single user by ID
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "user" }
  ];
  
  const user = users.find(u => u.id === userId);
  
  if (user) {
    res.json({ success: true, data: user });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});

// Create a new message (POST example)
app.post("/api/messages", (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email, and message"
    });
  }
  
  // In a real app, you'd save this to Firestore
  const newMessage = {
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json({
    success: true,
    message: "Message received!",
    data: newMessage
  });
});

// Get server info
app.get("/api/info", (req, res) => {
  res.json({
    name: "check-cicd API",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    deployedAt: new Date().toISOString(),
    endpoints: [
      "GET  /api/health   - Health check",
      "GET  /api/users    - List all users",
      "GET  /api/users/:id - Get user by ID",
      "POST /api/messages - Create a message",
      "GET  /api/info     - API information"
    ]
  });
});

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found`
  });
});

// Export the Express app as a Firebase Function (v2 syntax)
exports.api = onRequest(app);
