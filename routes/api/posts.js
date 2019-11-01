const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

// @route   POST api/post
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [
    // Use auth middleware to verify user is logged in
    auth,
    [
      // Make sure the post has some text inside it
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    //Check for errors in validation
    const errors = validationResult(req);

    //If there is an error return the error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Get the user that is trying to make a post by the user id and verify the password
      const user = await User.findById(req.user.id).select("-password");

      //Create a new post
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      // Save new post to database
      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      // If there is an error, show it in the console
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/post
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // Sort the posts by date starting with the most recent first
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch {
    // If error log it in the console
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/post/:id
// @desc    Get post by id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    // Get post by post id
    const post = await Post.findById(req.params.id);

    // If the post does not exist
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch {
    console.error(err.message);
    //Check to see if the ObjectId is the error
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/post/:id
// @desc    Delete a post
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // Find the post by the post id
    const post = await Post.findById(req.params.id);

    // If there is not post matching the id
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Make sure the user who wants to delete the post is the user who owns the post
    if (post.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Remove post from database
    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    //Check to see if the ObjectId is the error
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    // Find post by the post id
    const post = await Post.findById(req.params.id);

    //Check if the post has already been liked by user
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked by user" });
    }

    // Add the "like" the the beginning of likes array in database
    post.likes.unshift({ user: req.user.id });

    // Save the new like in the database
    await post.save();

    res.json(post.likes);
  } catch (err) {
    // If there is an error log it in the console
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/posts/unlike/:id
// @desc    unlike a post
// @access  Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if the post has been liked by user
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res
        .status(400)
        .json({ msg: "Post has not yet been liked by user" });
    }

    // Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    // Remove current user's like from database
    post.likes.splice(removeIndex, 1);

    // Save new array without deleted post
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/post/comment/:id
// @desc    Comment on a post
// @access  Private
router.post(
  "/comment/:id",
  [
    auth,
    [
      // Make sure user has entered some text in the input field
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // If input is not valid return error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Find current user by id and verify the password is correct
      const user = await User.findById(req.user.id).select("-password");
      // Find the post they want to comment on by post id
      const post = await Post.findById(req.params.id);

      // Take text from body as well as info from current users object to make comment
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      // Add comment to the top of comments on post
      post.comments.unshift(newComment);

      // Save comment to database
      await post.save();

      res.json(post.comments);
    } catch (err) {
      // Log error in the console
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/post/comment/:id
// @desc    Comment on a post
// @access  Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    // Find post they want to delete by post id
    const post = await Post.findById(req.params.id);

    //Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exists" });
    }
    //Check to make sure user who wants to delete comment made comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    //Get remove index
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    // Remove comment user selects
    post.comments.splice(removeIndex, 1);

    // Save comments array to database without the deleted comnment
    await post.save();

    res.json(post.comments);
  } catch (err) {
    // Log errors in the console
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
