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
