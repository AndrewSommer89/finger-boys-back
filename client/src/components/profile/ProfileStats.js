import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProfileStats = ({ scores }) => {
  const gamesBowled = scores.length;

  const averageScore = () => {
    let scoreTotal = 0;
    for (let i = 0; i < gamesBowled; i++) {
      let gameScore = scores[i].totalPins;
      scoreTotal = scoreTotal + gameScore;
    }
    return (scoreTotal / gamesBowled).toFixed(2);
  };

  const highScore = () => {
    let highestScore = 0;
    for (let i = 0; i < gamesBowled; i++) {
      if (scores[i].totalPins > highestScore) {
        highestScore = scores[i].totalPins;
      }
    }
    return highestScore;
  };

  const framesBowled = () => {
    let frames = 0;
    for (let i = 0; i < gamesBowled; i++) {
      frames = frames + scores[i].totalFrames;
    }
    return frames;
  };

  const totalStrikes = () => {
    let strikes = 0;
    for (let i = 0; i < gamesBowled; i++) {
      strikes = strikes + scores[i].totalStrikes;
    }
    return strikes;
  };

  const strikePercentage = () => {
    let strikeDecimal = (totalStrikes() / framesBowled()) * 100;
    const strikePercent = strikeDecimal.toFixed(2) + "%";
    return strikePercent;
  };

  const totalSpares = () => {
    let spares = 0;
    for (let i = 0; i < gamesBowled; i++) {
      spares = spares + scores[i].totalSpares;
    }
    return spares;
  };

  const sparePercentage = () => {
    let spareDecimal = (totalSpares() / framesBowled()) * 100;
    const sparePercentage = spareDecimal.toFixed(2) + "%";
    return sparePercentage;
  };

  const openFramePercentage = () => {
    const scores = totalStrikes() + totalSpares();
    const openFrames = framesBowled() - scores;
    const openFramesDecimal = (openFrames / framesBowled()) * 100;
    return openFramesDecimal.toFixed(2) + "%";
  };

  const singlePinPickupPercentage = () => {
    let attempts = 0;
    let pickups = 0;
    for (let i = 0; i < gamesBowled; i++) {
      attempts = attempts + scores[i].singlePinSpareAttempts;
      pickups = pickups + scores[i].singlePinSparesConverted;
    }
    let pickupDecimal = (pickups / attempts) * 100;
    return pickupDecimal.toFixed(2) + "%";
  };

  const totalSplits = () => {
    let splits = 0;
    for (let i = 0; i < gamesBowled; i++) {
      splits = splits + scores[i].totalSplits;
    }
    return splits;
  };

  const splitsConverted = () => {
    let converted = 0;
    for (let i = 0; i < gamesBowled; i++) {
      converted = converted + scores[i].splitsConverted;
    }
    return converted;
  };

  const splitPercentage = () => {
    let splitDecimal = splitsConverted() / totalSplits();
    return splitDecimal.toFixed(2) + "%";
  };

  const gutterballs = () => {
    let gutters = 0;
    for (let i = 0; i < gamesBowled; i++) {
      gutters = gutters + scores[i].gutterballs;
    }
    return gutters;
  };

  const gutterballPercentage = () => {
    let gutterballDecimal = (gutterballs() / framesBowled()) * 100;
    return gutterballDecimal.toFixed(2) + "%";
  };

  const gamesUnder100 = () => {
    let games100 = 0;
    for (let i = 0; i < gamesBowled; i++) {
      if (scores[i].totalPins < 100) {
        games100++;
      }
    }
    return games100;
  };

  const gamesOver175 = () => {
    let gamesOver = 0;
    for (let i = 0; i < gamesBowled; i++) {
      if (scores[i].totalPins > 175 && scores[i].totalPins < 200) {
        gamesOver++;
      }
    }
    return gamesOver;
  };

  const gamesOver200 = () => {
    let gamesOver = 0;
    for (let i = 0; i < gamesBowled; i++) {
      if (scores[i].totalPins > 200 && scores[i].totalPins < 225) {
        gamesOver++;
      }
    }
    return gamesOver;
  };

  const gamesOver225 = () => {
    let gamesOver = 0;
    for (let i = 0; i < gamesBowled; i++) {
      if (scores[i].totalPins > 225 && scores[i].totalPins < 250) {
        gamesOver++;
      }
    }
    return gamesOver;
  };

  const gamesOver250 = () => {
    let gamesOver = 0;
    for (let i = 0; i < gamesBowled; i++) {
      if (scores[i].totalPins > 250 && scores[i].totalPins < 275) {
        gamesOver++;
      }
    }
    return gamesOver;
  };

  const gamesOver275 = () => {
    let gamesOver = 0;
    for (let i = 0; i < gamesBowled; i++) {
      if (scores[i].totalPins > 275 && scores[i].totalPins < 300) {
        gamesOver++;
      }
    }
    return gamesOver;
  };

  const games300 = () => {
    let games = 0;
    for (let i = 0; i < gamesBowled; i++) {
      if (scores[i].totalPins === 300) {
        games++;
      }
    }
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
