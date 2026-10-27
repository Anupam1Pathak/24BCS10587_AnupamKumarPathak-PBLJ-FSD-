const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const registrationRoutes = require("./routes/registrationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Campus Event Registration API is running",
  });
});

app.use("/api/registrations", registrationRoutes);

// Handles unknown routes.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Final error handler: never return raw stack traces to clients.
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

async function startServer() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is missing. Add it to your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Atlas connected successfully!");

    app.listen(PORT, () => {
      console.log(
        `Campus Event Registration API running at http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
