import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProfileStats = ({ scores }) => {
  // Create variable to and set it to the total number of games a user has bowled
  const gamesBowled = scores.length;

  // Calculate average score
  const averageScore = () => {
    // Create variable to store the combined scores total
    let scoreTotal = 0;
    // Loop through gamesBowled
    for (let i = 0; i < gamesBowled; i++) {
      // Create variable to store the totalPins of current game bowled
      let gameScore = scores[i].totalPins;
      // Add current gameScore to scoreTotal
      scoreTotal = scoreTotal + gameScore;
    }
    // return scoreTotal divided by gamesBowled, and limit the decimal points
    let avg = (scoreTotal / gamesBowled).toFixed(2);
    if (isNaN(avg)) {
      return 0;
    } else {
      return avg;
    }
  };

  // Find out users high score
  const highScore = () => {
    // Set highestScore to 0
    let highestScore = 0;
    // Loop through gamesBowled
    for (let i = 0; i < gamesBowled; i++) {
      // Determine if current game's score is higher than score stored in "highestScore"
      if (scores[i].totalPins > highestScore) {
        // If current game's score IS higher, set "highestScore" to current game's score
        highestScore = scores[i].totalPins;
      }
    }
    // return value stored in "highestScore"
    return highestScore;
  };

  // Calcuate bowler's total frames
  const framesBowled = () => {
    // Create variable to store how many frames the bowler has bowled
    let frames = 0;
    // Loop through gamesBowled
    for (let i = 0; i < gamesBowled; i++) {
      // Add current game's "totalFrames" to "frames"
      frames = frames + scores[i].totalFrames;
    }
    // return frames
    return frames;
  };

  // Calculate the total number of strikes
  const totalStrikes = () => {
    // Create variable to store total number of strikes
    let strikes = 0;
    // Loop through gamesBowled
    for (let i = 0; i < gamesBowled; i++) {
      // Add "totalStrikes" from current game to "strikes"
      strikes = strikes + scores[i].totalStrikes;
    }
    // return strikes
    return strikes;
  };

  // Calculate strike percentage
  const strikePercentage = () => {
    // Divide total number of strikes by the number of frames bowled and mulitply by 100
    let strikeDecimal = (totalStrikes() / framesBowled()) * 100;
    // Limit the decimal points and add "%" string at the end
    const strikePercent = strikeDecimal.toFixed(2) + "%";
    // return strikePercent
    if (isNaN(strikePercent)) {
      return 0;
    } else {
      return strikePercent;
    }
  };

  // Calculate user's total number of spares
  const totalSpares = () => {
    // Create variable to store total number of spares
    let spares = 0;
    // Loop through "gamesBowled"
    for (let i = 0; i < gamesBowled; i++) {
      // add "totalSpares" from current game to "spares"
      spares = spares + scores[i].totalSpares;
    }
    // return spares
    return spares;
  };

  // Calculate spare percentage
  const sparePercentage = () => {
    // Divide total number of spares by the number of frames bowled and mulitply by 100
    let spareDecimal = (totalSpares() / framesBowled()) * 100;
    // Limit the decimal points and add "%" string at the end
    const sparePercentage = spareDecimal.toFixed(2) + "%";
    // return sparePercentage
    if (isNaN(sparePercentage)) {
      return 0;
    } else {
      return sparePercentage;
    }
  };

  // Calculate percentage of times user did not have either a strike or a spare
  const openFramePercentage = () => {
    // create variable to hold the total number of strikes + the total number of spares
    const scores = totalStrikes() + totalSpares();
    // create variable that takes the total number of frames a user has bowled and subtract "scores"
    const openFrames = framesBowled() - scores;
    // divide "openFrames" by the number of frames bowled and multiply by 100
    const openFramesDecimal = (openFrames / framesBowled()) * 100;
    // Limit the decimal points and add "%" string at the end
    let openP = openFramesDecimal.toFixed(2) + "%";
    if (isNaN(openP)) {
      return 0;
    } else {
      return openP;
    }
  };

  // percentage the user has picked up a spare with only one pin left
  const singlePinPickupPercentage = () => {
    // create variable to store the number of times the user had one pin left
    let attempts = 0;
    // create variable to store the number of times the user picked up the spare with only one pin left
    let pickups = 0;
    // loop through games bowled
    for (let i = 0; i < gamesBowled; i++) {
      // add "sinlgePinSpareAttempts" from current game to attempts
      attempts = attempts + scores[i].singlePinSpareAttempts;
      // add "sinlgePinSparesConverted" from current game to pickups
      pickups = pickups + scores[i].singlePinSparesConverted;
    }
    // divide "pickups" by "attempts" and multiply by 100
    let pickupDecimal = (pickups / attempts) * 100;
    // Limit the decimal points and add "%" string at the end
    let pickupP = pickupDecimal.toFixed(2) + "%";
    if (isNaN(pickupP)) {
      return 0;
    } else {
      return pickupP;
    }
  };

  // Calculate the total number of splits the user has had
  const totalSplits = () => {
    // create variable to store the total number of splits
    let splits = 0;
    // loop through "gamesBowled"
    for (let i = 0; i < gamesBowled; i++) {
      // add "totalSplits" from current game to "splits"
      splits = splits + scores[i].totalSplits;
    }
    // return "splits"
    return splits;
  };

  // Calculate the number of splits picked up
  const splitsConverted = () => {
    // create variable t o store the total number of splits picked up
    let converted = 0;
    // loop through "gamesBowled"
    for (let i = 0; i < gamesBowled; i++) {
      // add 'splitsConverted" from current game to "converted"
      converted = converted + scores[i].splitsConverted;
    }
    //return "converted"
    return converted;
  };

  // Calculate percentage of splits converted
  const splitPercentage = () => {
    // divided "splitsConverted()" by "totalSplits()"
    let splitDecimal = splitsConverted() / totalSplits();
    // Limit the decimal points and add "%" string at the end and return it
    let splitsP = splitDecimal.toFixed(2) + "%";
    if (isNaN(splitsP)) {
      return 0;
    } else {
      return splitsP;
    }
  };

  // Calcualte the total number of gutterballs
  const gutterballs = () => {
    // Create variable to store the total number of gutterballs
    let gutters = 0;
    // Loop through "gamesBowled"
    for (let i = 0; i < gamesBowled; i++) {
      // add "gutterballs" from the current score and add to "gutters"
      gutters = gutters + scores[i].gutterballs;
    }
    // return "gutters"
    return gutters;
  };

  // Calculate percentage of gutterballs
  const gutterballPercentage = () => {
    // Divide "gutterballs()" by "framesBowled()" and multiply by 100
    let gutterballDecimal = (gutterballs() / framesBowled()) * 100;
    // Limit the decimal points and add "%" string at the end and return it
    let gutterballP = gutterballDecimal.toFixed(2) + "%";
    if (isNaN(gutterballP)) {
      return 0;
    } else {
      return gutterballP;
    }
  };

  // calcualte the number of games the user bowled under 100
  const gamesUnder100 = () => {
    // create variable to store the number of times the user bowled under 100
    let games100 = 0;
    // loop through the games
    for (let i = 0; i < gamesBowled; i++) {
      // if the score is less than 100, add 1 to "games100"
      if (scores[i].totalPins < 100) {
        games100++;
      }
    }
    // return the number of games under 100
    return games100;
  };

  // Calculate the number of games the user bowled over 175
  const gamesOver175 = () => {
    // Create variable to store the number of times the user bowled over 175
    let gamesOver = 0;
    // Loop through the games
    for (let i = 0; i < gamesBowled; i++) {
      // If the score is over 174 and under 200 add 1 to "gamesOver"
      if (scores[i].totalPins > 174 && scores[i].totalPins < 200) {
        gamesOver++;
      }
    }
    // return the number of games between 175 and 200
    return gamesOver;
  };

  // Calculate the number of games the user bowled between 200 and 224
  const gamesOver200 = () => {
    // Create variable to store the number of times the user bowled 200 or over
    let gamesOver = 0;
    // Loop through the games
    for (let i = 0; i < gamesBowled; i++) {
      // If the scores is over 199 and under 225 add 1 to "gamesOver"
      if (scores[i].totalPins > 199 && scores[i].totalPins < 225) {
        gamesOver++;
      }
    }
    // return the number of games between 200 and 225
    return gamesOver;
  };

  // Calculate the number of games the user bowled between 225 and 249
  const gamesOver225 = () => {
    // Cretate variable to store the number of times the user bowled between 225 and 249
    let gamesOver = 0;
    // Loop through games
    for (let i = 0; i < gamesBowled; i++) {
      // If the score is between 225 and 249 add 1 to "gamesOver"
      if (scores[i].totalPins > 224 && scores[i].totalPins < 250) {
        gamesOver++;
      }
    }
    // return the number of games between 225 and 249
    return gamesOver;
  };

  // Calculate the number of games the user bowled between 250 and 274
  const gamesOver250 = () => {
    // Create variable to store the number of times the user bowled between 250 and 274
    let gamesOver = 0;
    // Loop through the games
    for (let i = 0; i < gamesBowled; i++) {
      // If the score is between 250 and 274 add 1 to "gamesOver"
      if (scores[i].totalPins > 250 && scores[i].totalPins < 275) {
        gamesOver++;
      }
    }
    // return the number of games between 250 and 274
    return gamesOver;
  };

  // Calculate the number of games the user bowled between 275 and 299
  const gamesOver275 = () => {
    // Create variable to store the number of times the user bowled between 275 and 299
    let gamesOver = 0;
    // Loop through the games
    for (let i = 0; i < gamesBowled; i++) {
      // If the score is between 275 and 299 add 1 to "gamesOver"
      if (scores[i].totalPins > 275 && scores[i].totalPins < 300) {
        gamesOver++;
      }
    }
    // return the number of games between 275 and 299
    return gamesOver;
  };

  // Calcualte the number of times the user has bowled 300
  const games300 = () => {
    // Create variable to store the number of times the user has bowled a 300
    let games = 0;
    // Loop through the games
    for (let i = 0; i < gamesBowled; i++) {
      // If the bowled scored a 300 add 1 to "games"
      if (scores[i].totalPins === 300) {
        games++;
      }
    }
    // return the number of games the user has bowled a 300
    return games;
  };

  return (
    <div className="profile-about bg-light p-2">
      <Fragment>
        <h2 className="text-primary">Stats</h2>
        <h3 className="text-primary">Game Scores</h3>
        <table className="profile-stats profile-stats-scores">
          <thead>
            <tr>
              <th>Under 100</th>
              <th>175+</th>
              <th>200+</th>
              <th>225+</th>
              <th>250+</th>
              <th>275+</th>
              <th>300 LEGENDS CLUB</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{gamesUnder100()}</td>
              <td>{gamesOver175()}</td>
              <td>{gamesOver200()}</td>
              <td>{gamesOver225()}</td>
              <td>{gamesOver250()}</td>
              <td>{gamesOver275()}</td>
              <td>{games300()}</td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-primary">Game Stats</h3>
        <table className="profile-stats profile-stats-stats">
          <thead>
            <tr>
              <th>Average Score</th>
              <th>High Score</th>
              <th className="hide-sm">Games Bowled</th>
              <th className="hide-sm">Frames Bowled</th>
              <th className="hide-sm">Strikes</th>
              <th>Strike %</th>
              <th className="hide-sm">Spares</th>
              <th>Spare %</th>
              <th className="hide-sm">Splits Converted</th>
              <th className="hide-sm">Split %</th>
              <th className="hide-sm">Open Frame %</th>
              <th className="hide-sm">Single Pin Pickups</th>
              <th className="hide-sm">Gutterballs</th>
              <th className="hide-sm">Gutterball %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{averageScore()}</td>
              <td>{highScore()}</td>
              <td className="hide-sm">{gamesBowled}</td>
              <td className="hide-sm">{framesBowled()}</td>
              <td className="hide-sm">{totalStrikes()}</td>
              <td>{strikePercentage()}</td>
              <td className="hide-sm">{totalSpares()}</td>
              <td>{sparePercentage()}</td>
              <td className="hide-sm">{splitsConverted()}</td>
              <td className="hide-sm">{splitPercentage()}</td>
              <td className="hide-sm">{openFramePercentage()}</td>
              <td className="hide-sm">{singlePinPickupPercentage()}</td>
              <td className="hide-sm">{gutterballs()}</td>
              <td className="hide-sm">{gutterballPercentage()}</td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    </div>
  );
};

ProfileStats.propTypes = {
  scores: PropTypes.array.isRequired
};

export default connect(null)(ProfileStats);
