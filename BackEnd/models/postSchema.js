const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: { type: String },
    username: { type: String },
    profilePicture: { type: String },
    title: { type: String, required: true },
    image: { type: String },
    likes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
