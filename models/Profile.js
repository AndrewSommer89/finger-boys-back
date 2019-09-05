const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  leagueMember: {
    type: Boolean,
    required: true
  },
  phone: {
    type: String
  },

  stats: [
    {
      averageScore: {
        type: Number
      },
      highScore: {
        type: Number
      },
      whiteRussiansBought: {
        type: Number
      },
      gamesBowled: {
        type: Number
      },
      framesBowled: {
        type: Number
      },
      strikes: {
        type: Number
      },
      strikePercentage: {
        type: Number
      },
      spares: {
        type: Number
      },
      sparePercentage: {
        type: Number
      },
      firstBallAverage: {
        type: Number
      },
      openFramePercentage: {
        type: Number
      },
      singlePinPickupPercentage: {
        type: Number
      },
      totalSplits: {
        type: Number
      },
      totalSplitsConverted: {
        type: Number
      },
      splitConversionRate: {
        type: Number
      },
      gutterballs: {
        type: Number
      },
      gutterballPercentage: {
        type: Number
      },
      under100: {
        type: Number
      },
      above175: {
        type: Number
      },
      above200: {
        type: Number
      },
      above225: {
        type: Number
      },
      above275: {
        type: Number
      },
      legendsClub: {
        type: Boolean,
        type: Number
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
