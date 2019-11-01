import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  //If user is already authenticated send user to their own dashboard
  if (isAuthenticated) {
    return <Redirect to="dashboard" />;
  }
  // If user is not authenticated
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Finger Boys</h1>
          <p className="lead">JOIN FOR A STRIKING GOOD TIME</p>
          <div className="buttons">
            <Link
              //Link to register page
              to="/register"
              className="btn btn-primary"
            >
              Sign Up
            </Link>
            <Link
              // Link to login page
              to="/login"
              className="btn btn-light"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
