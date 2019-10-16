import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  // Take out the needed information from profile
  profile: {
    leagueMember,
    homeLane,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      <p>{leagueMember ? "League Member" : "Club Member"}</p>
      <p>{homeLane && <span>{homeLane}</span>} </p>
      <div className="icons my-1">
        {// Check to see if their is a social object and inside it there is a social.twitter object
        // If there is a social.twitter display it
        social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        )}
        {// Check to see if their is a social object and inside it there is a social.facebook object
        // If there is a social.facebook display it
        social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
        )}
        {// Check to see if their is a social object and inside it there is a social.linkedin object
        // If there is a social.linked display it
        social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        )}
        {// Check to see if their is a social object and inside it there is a social.instagram object
        // If there is a social.instagram display it
        social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
