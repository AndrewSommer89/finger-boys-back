import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CreateProfile = props => {
  const [formData, setFormData] = useState({
    leageMember: false,
    phone: ""
  });

  //hide social inputs by default
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    leagueMember,
    phone,
    homeLane,
    twitter,
    facebook,
    linkedin,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information from you
      </p>
      <form className="form">
        <div className="form-group">
          <select
            name="leageMember"
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
            Mobile Phone (only other club members can see your numbe)
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
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {};

export default CreateProfile;
