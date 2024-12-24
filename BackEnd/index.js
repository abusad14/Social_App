const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const path = require("path");
require("./db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes");

app.use(express.json());
app.use(cors());
// Serve static files from the "uploads" directory
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/uploads", express.static("uploads"));

//! Serve the uploads folder as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.send("Abusad");
});
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/profile", profileRoutes);
const port = process.env.PORT;
app.listen(port, console.log(`Server is live on Port:${port}`));
