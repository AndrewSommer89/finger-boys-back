import React from "react";
import { Link } from "react-router-dom";

const DashBoardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/add-score" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Add Scores
      </Link>
    </div>
  );
};

export default DashBoardActions;
