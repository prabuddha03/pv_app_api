const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const eventDayRoutes = require("./routes/eventDayRoutes");
const itemRoutes = require("./routes/itemRoutes");
const mealRoutes = require("./routes/mealRoutes");
const cartRoutes = require("./routes/foodCartRoutes");
const foodBookingRoutes = require("./routes/foodBookingRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/eventDay", eventDayRoutes);
app.use("/api/v1/item", itemRoutes);
app.use("/api/v1/meal", mealRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/booking", foodBookingRoutes);
app.use("/api/v1/user", userRoutes);

// Make sure to use the PORT from environment variable
const PORT = parseInt(process.env.PORT) || 8080;

// Update the listen callback to include error handling
app
  .listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
  });
