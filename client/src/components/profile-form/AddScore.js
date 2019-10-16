import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addScore } from "../../actions/profile";

const AddScore = ({ addScore, history }) => {
  // set the state for the component
  // formData = object with all the field values
  // setFormData = function to update the state
  const [formData, setFormData] = useState({
    // Default values
    date: "",
    gameWon: false,
    totalFrames: 0,
    totalPins: 0,
    totalSpares: 0,
    totalStrikes: 0,
    totalSplits: 0,
    splitsConverted: 0,
    gutterballs: 0,
    singlePinSpareAttempts: 0,
    singlePinSparesConverted: 0
  });

  // Destructure
  const {
    date,
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
  } = formData;

  // When user types in the input box it updates the state
  const onChange = e =>
    // Copy the form data
    // Make the target the current input the user is in
    // Change the target to value that is typed in
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Add a Score</h1>
        <small>* = required field</small>
        <form
          className="form"
          onSubmit={e => {
            // Stop the page from refeshing when submitting form
            e.preventDefault();
            // Pass the formData and history to addScore action to add score to database
            addScore(formData, history);
          }}
        >
          <div className="form-group">
            <input
              type="date"
              placeholder="* Date of game"
              name="date"
              value={date}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <select name="gameWon" value={gameWon} onChange={e => onChange(e)}>
              <option value="0">* Select</option>
              <option value={true}>Won</option>
              <option value={false}>Lost</option>
            </select>
            <small className="form-text">Did you win?</small>
          </div>
          <div className="form-group">
            <h4>Total Frames</h4>
            <input
              type="number"
              name="totalFrames"
              value={totalFrames}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <h4>Total Pins</h4>
            <input
              type="number"
              name="totalPins"
              value={totalPins}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <h4>Total Spares</h4>
            <input
              type="number"
              name="totalSpares"
              value={totalSpares}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <h4>Total Strikes</h4>
            <input
              type="number"
              name="totalStrikes"
              value={totalStrikes}
              onChange={e => onChange(e)}
            />
            <div className="form-group">
              <h4>Total Splits</h4>
              <input
                type="number"
                name="totalSplits"
                value={totalSplits}
                onChange={e => onChange(e)}
              />
              <div className="form-group">
                <h4>Splits Converted</h4>
                <input
                  type="number"
                  name="splitsConverted"
                  value={splitsConverted}
                  onChange={e => onChange(e)}
                />
                <div className="form-group">
                  <h4>Gutterballs</h4>
                  <input
                    type="number"
                    name="gutterballs"
                    value={gutterballs}
                    onChange={e => onChange(e)}
                  />
                  <div className="form-group">
                    <h4>Single Pin Spare Attempts</h4>
                    <input
                      type="number"
                      name="singlePinSpareAttempts"
                      value={singlePinSpareAttempts}
                      onChange={e => onChange(e)}
                    />
                    <div className="form-group">
                      <h4>Single Pin Spares Converted</h4>
                      <input
                        type="number"
                        name="singlePinSparesConverted"
                        value={singlePinSparesConverted}
                        onChange={e => onChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

AddScore.propTypes = {
  addScore: PropTypes.func.isRequired
};

export default connect(
  null,
  { addScore }
)(withRouter(AddScore));
