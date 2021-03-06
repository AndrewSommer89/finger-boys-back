import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteScore } from "../../actions/profile";

const Scores = ({ scores, deleteScore }) => {
  // create array of scores that displays scores from the database
  const scoreDisplay = scores.map(score => (
    <tr key={score._id}>
      <td>
        <Moment format="YYYY/MM/DD">{score.date}</Moment>
      </td>
      <td className="hide-sm">{score.gameWon === true ? "Win" : "Loss"}</td>
      <td className="hide-sm">{score.totalFrames}</td>
      <td>{score.totalPins}</td>
      <td>{score.totalStrikes}</td>
      <td>{score.totalSpares} </td>
      <td className="hide-sm">{score.totalSplits}</td>
      <td className="hide-sm">{score.splitsConverted}</td>
      <td className="hide-sm">{score.singlePinSparesConverted}</td>
      <td className="hide-sm">{score.singlePinSpareAttempts}</td>
      <td className="hide-sm">{score.gutterballs}</td>
      <td>
        <button
          onClick={
            // Delete clicked on score by passing the score._id into deleteScore function
            () => deleteScore(score._id)
          }
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    // Create table that shows scores
    <Fragment>
      <h2 className="my-2">Scores</h2>
      <p>
        * TS = Total Splits <br />
        * SC = Splits Converted <br />
        * SPS = Single Pin Spares <br />
        * SPSA = Single Pin Spare Attempts <br />* GB = Gutterballs
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th className="hide-sm">Won?</th>
            <th className="hide-sm">Frames</th>
            <th>Score</th>
            <th>Strikes</th>
            <th>Spares</th>
            <th className="hide-sm">TS</th>
            <th className="hide-sm">SC</th>
            <th className="hide-sm">SPS</th>
            <th className="hide-sm">SPSA</th>
            <th className="hide-sm">GB</th>
          </tr>
        </thead>
        <tbody>{scoreDisplay}</tbody>
      </table>
    </Fragment>
  );
};

Scores.propTypes = {
  scores: PropTypes.array.isRequired
};

export default connect(
  null,
  { deleteScore }
)(Scores);
