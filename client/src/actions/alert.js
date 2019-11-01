import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, alertType) => dispatch => {
  // Get random id to assign to the alert
  const id = uuid.v4();
  dispatch({
    // Set type to SET-ALERT
    type: SET_ALERT,
    // Pass along the payload
    payload: { msg, alertType, id }
  });

  // Remove the alert from the screen after 5 seconds
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
