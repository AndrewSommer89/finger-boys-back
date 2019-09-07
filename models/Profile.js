const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  leagueMember: {
    type: Boolean
  },
  phone: {
    type: String
  },
  homeLane: {
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
  social: {
    instagram: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    }
  },
  scores: [
    {
      date: {
        type: Date,
        default: Date.now
      },
      gameWon: {
        type: Boolean
      },
      totalFrames: {
        type: Number,
        required: true
      },
      totalPins: {
        type: Number,
        required: true
      },
      totalSpares: {
        type: Number,
        required: true
      },
      totalStrikes: {
        type: Number,
        required: true
      },
      totalSplits: {
        type: Number,
        required: true
      },
      splitsConverted: {
        type: Number,
        required: true
      },
      gutterballs: {
        type: Number,
        required: true
      },
      singlePinSpareAttempts: {
        type: Number,
        required: true
      },
      singlePinSparesConverted: {
        type: Number,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
