import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  // Links for when user is logged in
  const authLinks = (
    <ul>
      <li>
        <Link
          // Link to list of users
          to="/profiles"
        >
          Bowlers
        </Link>
      </li>
      <li>
        <Link
          // Link to posts page
          to="/posts"
        >
          Posts
        </Link>
      </li>
      <li>
        <Link
          // user icon that links to user's dashboard
          to="/dashboard"
        >
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link
          // logout icon that when clicked logs user out
          onClick={logout}
          to="/"
        >
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  // Links for when user is NOT logged in
  const guestLinks = (
    <ul>
      <li>
        <Link
          //Link to page with list of users
          to="/profiles"
        >
          Developers
        </Link>
      </li>
      <li>
        <Link
          //Link to register page
          to="/register"
        >
          Register
        </Link>
      </li>
      <li>
        <Link
          // Link to login page
          to="/login"
        >
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link
          // Make logo a link to homepage
          to="/"
        >
          <i className="fas fa-bowling-ball"></i> Finger Boys
        </Link>
      </h1>
      {!loading && (
        // If user is logged in show "authLinks"
        // If user is NOT logged in show "guesLinks"
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
