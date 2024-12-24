const user = require("express").Router();
require("dotenv").config();
const userSchema = require("../models/userSchema");
const profileSchema = require("../models/profileSchema");
const bcrypt = require("bcrypt");

// *get all user
user.get("/all", async (req, res) => {
  const allUser = await userSchema.find({});
  // const allUserProfiles = await profileSchema.find();
  res.status(200).json({ allUser });
});

// *Delete a user
user.delete("/delete/:id", async (req, res) => {
  const deletedUser = await userSchema.findByIdAndDelete(req.params.id);
  const deletedUserProfile = await profileSchema.findOneAndDelete({
    userId: req.params.id,
  });
  if (!deletedUser || !deletedUserProfile) {
    res.status(400).json({ message: "No user found" });
  }
  res.status(200).json({ deletedUser, deletedUserProfile });
});

// *get a user
user.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await userSchema.findById(id);
    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
  }
});

// *get all user
user.get("/all", async (req, res) => {
  const allUser = await userSchema.find({});
  res.send(allUser.allUser[0]);
});
// *update user
user.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const userData = await userSchema.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!userData) return res.status(404).json({ message: "User not found" });
    res.status(200).json(userData);
  } catch (error) {
    if (error.name == "CastError")
      res.status(404).json({ message: "inocrrect format" });
  }
});

// *delete user
user.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userSchema.findByIdAndDelete(id);
    if (!data) return res.status(404).json({ message: "No data found" });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

// *follow a user
user.put("/:id/follow", async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const me = await userSchema.findById(req.params.id);
      !me && res.status(404).json("You are not logged in");

      const followThis = await userSchema.findById(req.body.userId);
      !followThis && res.status(404).json("This user does not exist");

      if (!me.followings.includes(followThis.username)) {
        await me.updateOne({ $push: { followings: followThis.username } });
        await followThis.updateOne({ $push: { followers: me.username } });
        res.status(200).json(`You started following ${followThis.username}`);
      } else {
        res.status(403).json(`You already follow ${followThis.username}`);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
});

// *unfollow a user
user.put("/:id/unfollow", async (req, res) => {
  const myParamsId = req.params.id;
  const followerId = req.body.userId;
  const myData = await userSchema.findById(myParamsId);
  const followerData = await userSchema.findById(followerId);

  !myData && res.status(404).json(`User ${myParamsId} is not present`);
  !followerData &&
    res.status(404).json(`Follower ${myParamsId} is not present`);
  if (myData.followings.includes(followerData.username)) {
    await myData.updateOne({ $pull: { followings: followerData.username } });
    await followerData.updateOne({ $pull: { followers: myData.username } });
    res.status(200).json(`You unfollowed ${followerData.username}`);
  } else {
    res.status(404).json(`You don't follow ${followerData.username} `);
  }
});
module.exports = user;
