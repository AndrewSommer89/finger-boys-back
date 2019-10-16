import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileStats from "./ProfileStats";
import ProfileScores from "./ProfileScores";
import { getProfileById } from "../../actions/profile";

const Profile = ({
  // Props
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    // Call get getPost() as soon component loads
    getProfileById(match.params.id);
    // add "[]" to make function load only once
  }, [getProfileById, match.params.id]);

  // If the profile is still loading show spinner, else show fragment with content inside
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles{" "}
          </Link>
          {// If user is logged in
          // and user is loaded
          // and the logged in user is on thier own profile
          // Add link to edit profile
          auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i> Edit Profile
              </Link>
            )}
          <div>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileStats scores={profile.scores} />
            <ProfileScores profile={profile} scores={profile.scores} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
