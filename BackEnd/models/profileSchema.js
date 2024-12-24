const mongoose = require("mongoose");

const profile = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    profilePicture: {
      type: String,
      default: "uploads/profileImages/default_Profile.png",
    },
    coverPicture: {
      type: String,
      default: "uploads/profileImages/default_Cover.jpg",
    },
    bio: { type: String, default: "" },
    city: { type: String, default: "" },
    likes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profile);
