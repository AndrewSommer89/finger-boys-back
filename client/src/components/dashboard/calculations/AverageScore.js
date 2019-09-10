import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AverageScore = ({ scores }) => {
  return (
    <div>
      <AverageScore />
    </div>
  );
};

AverageScore.propTypes = {
  scores: PropTypes.array.isRequired
};

export default connect(null)(AverageScore);
