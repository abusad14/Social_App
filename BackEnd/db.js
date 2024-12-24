const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.url;

mongoose.connect(url);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("DB is connected");
});
db.on("disconnected", () => {
  console.log("DB is disconnected");
});
db.on("error", () => {
  console.log("Error in DB");
});

module.exports = db;
