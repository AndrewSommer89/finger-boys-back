import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Stats = ({ scores }) => {
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
    <Fragment>
      <h2 className="my-2">Stats</h2>
      <table className="statsTable table">
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
      <table className="statsTable table">
        <thead>
          <tr>
            <th>Average Score</th>
            <th>High Score</th>
            <th>Games Bowled</th>
            <th>Frames Bowled</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{averageScore()}</td>
            <td>{highScore()}</td>
            <td>{gamesBowled}</td>
            <td>{framesBowled()}</td>
          </tr>
        </tbody>
      </table>
      <table className="statsTable table">
        <thead>
          <tr>
            <th>Strikes</th>
            <th>Strike %</th>
            <th>Spares</th>
            <th>Spare %</th>
            <th>Splits</th>
            <th>Splits Converted</th>
            <th>Split %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalStrikes()}</td>
            <td>{strikePercentage()}</td>
            <td>{totalSpares()}</td>
            <td>{sparePercentage()}</td>
            <td>{totalSplits()} </td>
            <td>{splitsConverted()}</td>
            <td>{splitPercentage()}</td>
          </tr>
        </tbody>
      </table>
      <table className="statsTable table">
        <thead>
          <tr>
            <th>Open Frame %</th>
            <th>Single Pin Pickup %</th>
            <th>Gutterballs</th>
            <th>Gutterball %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{openFramePercentage()}</td>
            <td>{singlePinPickupPercentage()}</td>
            <td>{gutterballs()}</td>
            <td>{gutterballPercentage()}</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

Stats.propTypes = {
  scores: PropTypes.array.isRequired
};

export default connect(null)(Stats);
