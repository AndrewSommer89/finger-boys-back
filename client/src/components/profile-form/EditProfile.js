import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({
  // Props
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  // set the state for the component
  // formData = object with all the field values
  // setFormData = function to update the state
  const [formData, setFormData] = useState({
    // Default values
    leagueMember: false,
    phone: "",
    homeLane: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    instagram: ""
  });

  //hide social inputs by default
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    // Get current users profile when the page loads
    getCurrentProfile();
    // Set the data to what is already in the user's profile
    setFormData({
      leagueMember:
        loading || !profile.leagueMember ? "" : profile.leagueMember,
      phone: loading || !profile.phone ? "" : profile.phone,
      homeLane: loading || !profile.homeLane ? "" : profile.homeLane,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      instagram: loading || !profile.social ? "" : profile.social.instagram
    });
  }, [loading, getCurrentProfile]);

  // Destructure
  const {
    leagueMember,
    phone,
    homeLane,
    bio,
    twitter,
    facebook,
    linkedin,
    instagram
  } = formData;

  // When user types in the input box it updates the state
  const onChange = e =>
    // Copy the form data
    // Make the target the current input the user is in
    // Change the target to value that is typed in
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    // Stop the page from refreshing when form is submitted
    e.preventDefault();
    // Update the profile by calling create file action and passing in formData, history and changing "edit" to true
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Update Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information from you
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select
            name="leagueMember"
            value={leagueMember}
            onChange={e => onChange(e)}
          >
            <option value="0">* Select</option>
            <option value={true}>I am a league member</option>
            <option value={false}>
              I am a member of the club, but not a league member
            </option>
          </select>
          <small className="form-text">Are you a league member?</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            So other club members can reach out
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Home Lane"
            name="homeLane"
            value={homeLane}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Where do you normally bowl?</small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
