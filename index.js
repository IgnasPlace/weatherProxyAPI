const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 40,
});
app.use(limiter);
app.set("trust proxy", 1);

// Enable cors
app.use(
  cors({
    origin: [
      "https://weather.ignasplace.com",
      "weather.ignasplace.com",
      "http://localhost:5173",
      "localhost:5173",
    ],
  })
);
// app.use(cors());

// Set static folder
// app.use(express.static('public'))

// Routes
app.use("/api", require("./routes"));

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
