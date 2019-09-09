import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

//Get current users profile

export const getCurrentProfile = () => async dispatch => {
  try {
    // Make request to backend
    // Will get the current users profile
    const res = await axios.get("/api/profile/me");

    // Dispatch redux action
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    // If there is an error
    // Dispatch redux action
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Create or update profile

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    // Since we are sending data create config object
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // Make POST request to "api/profile" on the backend
    const res = await axios.post("/api/profile", formData, config);

    //Return the profile
    // Dispatch redux action
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    // dispatch Alert that says whether profile was updated or created
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created"));

    //If we are editing it stay on page
    //If we creating it redirect
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    //  Look for any validation errors
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    // Dispatch redux action
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};