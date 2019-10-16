const mongoose = require("mongoose");

//Create UserSchema for mongoose model
const UserSchema = new mongoose.Schema({
  // User name, *required*
  name: {
    type: String,
    required: true
  },
  // User email, *required*
  email: {
    type: String,
    required: true,
    unique: true
  },
  //User password, *required*
  password: {
    type: String,
    required: true
  },
  // User picture (using gravatar)
  avatar: {
    type: String
  },
  // Date user signed up set
  date: {
    type: Date,
    default: Date.now
  }
});

// Export User model
module.exports = User = mongoose.model("user", UserSchema);
