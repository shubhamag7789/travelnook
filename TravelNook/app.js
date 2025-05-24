const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/userDB") // Removed deprecated options
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Import and use routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Default route to serve the login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000; // Allow flexibility with environment variables
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
