import React from "react";
import { Link } from "react-router-dom";

const DashBoardActions = () => {
  return (
    <div className="dash-buttons">
      <Link
        // Link to the edit profile form
        to="/edit-profile"
        className="btn btn-light"
      >
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link
        // Link to add a score form
        to="/add-score"
        className="btn btn-light"
      >
        <i className="fab fa-black-tie text-primary"></i> Add Scores
      </Link>
    </div>
  );
};

export default DashBoardActions;
