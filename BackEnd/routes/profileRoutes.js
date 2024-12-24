const profile = require("express").Router();
const multer = require("multer");
const profileSchema = require("../models/profileSchema");
const userSchema = require("../models/userSchema");
const verifyToken = require("./verifyToken");

// !Getting my profile or admin profile
profile.get("/my/:id", async (req, res) => {
  try {
    const userData = await userSchema.findById(req.params.id);
    const profileData = await profileSchema.findOne({ userId: req.params.id });
    if (!userData || !profileData) {
      res
        .status(400)
        .json({ message: "No user and profile found for this id " });
    }
    res.status(200).json({ userData, profileData });
    // console.log(data);
  } catch (error) {
    res.status(400).json({ message: "An error" });
    console.log(error);
  }
});

// !Getting others profile
profile.get("/:id", async (req, res) => {
  try {
    const userData = await userSchema.findById(req.params.id);
    const profileData = await profileSchema.findOne({ userId: req.params.id });
    if (!userData || !profileData) {
      return res.status(400).json({ message: "No data/user found" });
    }

    res.status(200).json({ userData, profileData });
  } catch (error) {
    console.log(error);
  }
});

//! Posting a profile data (bio,city,profilePic,coverPic)
// ?Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profileImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// !Middleware for token verify
// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ message: "Authorization header missing" });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, "abusad");
//     req.userId = decoded.userId; // Attach the userId to the request
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };

profile.put(
  "/update/:id",
  verifyToken,
  upload.fields([{ name: "profilePicture" }, { name: "coverPicture" }]),
  async (req, res) => {
    try {
      // const userId = req.params.id;
      const userData = await profileSchema.findOne({ userId: req.params.id });
      if (!userData) {
        return res.status(404).json({ message: "No data found for this id" });
      }
      const profilePicture =
        req.files?.profilePicture?.[0]?.path.replace(/\\/g, "/") || null;
      // const profilePicture = req.files?.profilePicture?.[0]?.path || null;
      const coverPicture =
        req.files?.coverPicture?.[0]?.path.replace(/\\/g, "/") || null;
      const { bio, city } = req.body;

      try {
        // Update fields in the retrieved document
        if (profilePicture) userData.profilePicture = profilePicture;
        if (coverPicture) userData.coverPicture = coverPicture;
        if (bio !== undefined && bio !== "") userData.bio = bio;
        if (city !== undefined && city !== "") userData.city = city;

        // Save the updated document
        const saved = await userData.save();

        return res.status(200).json(saved);
      } catch (error) {
        console.error("Error updating user data:", error.message);
        return res.status(500).json({
          message: "Failed to update user data",
          error: error.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
);
module.exports = profile;
