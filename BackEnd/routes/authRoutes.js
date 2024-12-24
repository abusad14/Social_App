const auth = require("express").Router();
const authSchema = require("../models/userSchema");
const profileSchema = require("../models/profileSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");

// !Register a user
auth.post("/register", async (req, res) => {
  try {
    const { username, email, password1, password2 } = req.body;

    // *Checking all the required fields
    if (!username) return res.status(404).json("username is required");
    if (!email) return res.status(404).json("email is required");
    if (!password1) return res.status(404).json("password is required");
    if (!password2) return res.status(404).json("re-enter the same password");

    // !Check if the email already exists
    const exist = await authSchema.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: "User already exist" });
    }
    // !Generate new hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password1, salt);

    // Save user to the database
    const newUser = new authSchema({
      username,
      email,
      password: hashedPassword,
    });
    // !Create a profile also when user register
    const saved = await newUser.save();
    const newProfile = new profileSchema({ userId: saved._id });
    const saveProfile = await newProfile.save();
    res.status(200).json({ saved, saveProfile });
  } catch (error) {
    res.status(500).json({ error: "Error occured" });
  }
});

// !Login route for user
auth.post("/login", async (req, res) => {
  try {
    const user = await authSchema.findOne({ email: req.body.email });
    !user && res.status(404).json("No user found , Enter the correct email id");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong password");

    // !JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "abusad",
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
    // console.log(`Login for ${req.body.email}`);
  } catch (error) {
    console.log(error);
  }
});

//! GET route to fetch user details
auth.get("/profile", verifyToken, async (req, res) => {
  // console.log("Profile getting");
  try {
    // Find user by ID extracted from the token
    const user = await authSchema.findById(req.userId);
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Respond with user data (exclude sensitive fields like password)
    // const { password, ...userWithoutPassword } = user._doc;
    // res.status(200).json(userWithoutPassword);
    // return res.status(200).json({ message: "User Data." });
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = auth;
