const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    // Get user profile
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    // If there is not profile send back error message
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    // If there are not errors respond with profile
    res.json(profile);
  } catch (err) {
    //If there is an error in the server
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/profile
// @desc  Create or update user profile
// @access Private

router.post(
  "/",
  auth,
  // User is autheticated and required info is validated
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //extract what you need from req.body
    const { leagueMember, phone } = req.body;

    // Build profile object
    // Set variable to empty object
    const profileFields = {};
    profileFields.user = req.user.id;
    // If field has input add to profileFields;
    if (leagueMember) profileFields.leagueMember = leagueMember;
    if (phone) profileFields.phone = phone;

    try {
      //Look for profile
      let profile = await Profile.findOne({ user: req.user.id });

      // Update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        //Return the profile
        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      // Save Profile
      await profile.save();
      res.json(profile);
    } catch (err) {
      //If there is a server error
      console.error(err.message);
      res.status(500).send("Server Error");
    }
    res.send("Profile Updated!");
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    // Look for profiles
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    // Respond with profiles
    res.json(profiles);
  } catch (err) {
    // If there is an error log it in console
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    // Look to see if there is a profile
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    //If there is no profile
    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    // If there is a server error
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/profile/user/:user_id
// @desc    Delete profile,user and posts
// @access  private
router.delete("/", auth, async (req, res) => {
  try {
    // @todo = remove users posts
    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  "/scores",
  [
    auth,
    [
      check("totalFrames", "Title is required")
        .not()
        .isEmpty(),
      check("totalPins", "Company is required")
        .not()
        .isEmpty(),
      check("totalSpares", "from date is required")
        .not()
        .isEmpty(),
      check("totalStrikes", "from date is required")
        .not()
        .isEmpty(),
      check("totalSplits", "from date is required")
        .not()
        .isEmpty(),
      check("splitsConverted", "from date is required")
        .not()
        .isEmpty(),
      check("gutterballs", "from date is required")
        .not()
        .isEmpty(),
      check("singlePinSpareAttempts", "from date is required")
        .not()
        .isEmpty(),
      check("singlePinSparesConverted", "from date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      gameWon,
      totalFrames,
      totalPins,
      totalSpares,
      totalStrikes,
      totalSplits,
      splitsConverted,
      gutterballs,
      singlePinSpareAttempts,
      singlePinSparesConverted
    } = req.body;

    const newScore = {
      gameWon,
      totalFrames,
      totalPins,
      totalSpares,
      totalStrikes,
      totalSplits,
      splitsConverted,
      gutterballs,
      singlePinSpareAttempts,
      singlePinSparesConverted
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.scores.unshift(newScore);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
