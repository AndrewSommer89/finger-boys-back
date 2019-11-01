const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create a PostSchema for mongoose model
const PostSchema = new Schema({
  // Create reference to user model so that post is associated with user
  // Connect to user id in User model
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },

  // Store post likes
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  // Store post's comments
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        defefault: Date.now
      }
    }
  ],

  // Date of post
  date: {
    type: Date,
    defefault: Date.now
  }
});

// Export Post model
module.exports = Post = mongoose.model("post", PostSchema);
