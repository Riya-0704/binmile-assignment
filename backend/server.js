const express = require("express");
const dotenv = require("dotenv");
const urlRoutes = require("./routes/urlRoute");
const connectDB = require("./config/db");

const rateLimit = require("./middleware/rateLimiter");
const helmet = require("helmet");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiting
app.use(rateLimit);

// Routes
app.use("/", urlRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
