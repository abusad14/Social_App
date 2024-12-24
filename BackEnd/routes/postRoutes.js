const router = require("express").Router();
const postSchema = require("../models/postSchema");
const userSchema = require("../models/userSchema");
const profileSchema = require("../models/profileSchema");
const multer = require("multer");

// *get all posts
router.get("/allPost", async (req, res) => {
  try {
    const posts = await postSchema.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error found" });
  }
});

// *get all posts of the user who has logged in
router.get("/myAllPosts/:id", async (req, res) => {
  const myPosts = await postSchema.find({ userId: req.params.id });
  res.status(200).json(myPosts);
});

// *upload a post
// ?Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/postImages"); //Directory to store files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); //unique filename
  },
});
const upload = multer({ storage });

router.post(
  "/share/:id",
  upload.fields([{ name: "image" }]),
  async (req, res) => {
    const userData = await userSchema.findById(req.params.id);
    const profileData = await profileSchema.findOne({ userId: req.params.id });
    if (!profileData || !userData) {
      return res.status(404).json("No profile or user data found for this id");
    }

    const newPost = new postSchema(
      new postSchema({
        userId: req.params.id,
        username: userData.username,
        profilePicture: profileData.profilePicture,
        title: req.body.title,
        image: req.files?.image?.[0]?.path.replace(/\\/g, "/") || null, // Handle undefined case
      })
    );
    const data = await newPost.save();
    console.log(" title oaky");
    res.send(data);
  }
);

// *get all post by individual user
router.get("/:id", async (req, res) => {
  try {
    const data = await postSchema.find({ userId: req.params.id });
    !data && res.status(404).json("No data foud , Enter valid id");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ Error: error });
  }
});

// *update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await postSchema.findById(req.params.id);
    console.log(post.username);
    if (!post) {
      res.status(404).json("No post found");
    } else if (post.userId == req.body.userId) {
      await postSchema.updateOne(
        { _id: req.params.id, userId: req.body.userId }, // Match post ID and user ID
        { $set: req.body } // Apply the update
      );
      console.log(post.username);
      res.status(200).json({ updatedPost: post.username });
    } else {
      res.status(300).json("You can update only your posts");
    }
  } catch (error) {
    res.status(400).json("Error occured");
  }
});

// *delete a post
router.delete("/:id", async (req, res) => {
  try {
    const data = await postSchema.findById(req.params.id);
    if (!data) {
      res.status(200).json("No post available ");
    } else if (data.userId == req.body.userId) {
      await postSchema.deleteOne();
      res.status(200).json("Deleted successfully ");
    } else {
      res.status(200).json("Can't Delete others post ");
    }
  } catch (error) {
    res.status(500).json("Error occured");
  }
});

// *like or dislike a post
router.put("/:id/like", async (req, res) => {
  const post = await postSchema.findById(req.params.id);
  const user = await userSchema.findById(req.body.userId);
  !post && res.status(404).json("No post found");
  !user && res.status(404).json("No user found");

  if (post.username == user.username && !post.likes.includes(user.username)) {
    await post.updateOne({ $push: { likes: user.username } });
    res.status(200).json("You liked your own post");
  } else if (
    post.username == user.username &&
    post.likes.includes(user.username)
  ) {
    await post.updateOne({ $pull: { likes: user.username } });
    res.status(200).json("You disliked your own post");
  } else if (post.likes.includes(user.username)) {
    await post.updateOne({ $pull: { likes: user.username } });
    res.status(200).json(`${user.username} disliked ${post.username}'s post`);
  } else if (!post.likes.includes(user.username)) {
    await post.updateOne({ $push: { likes: user.username } });
    res.status(200).json(`${user.username} liked ${post.username}'s post`);
  }
});

// *get timeline post
// router.get("/timeline/:id",async(req,res)=>{
//   try {
//     const currnetUser

//   } catch (error) {

//   }
// })
module.exports = router;
