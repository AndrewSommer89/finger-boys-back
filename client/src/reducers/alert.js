//Bring in action types
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

// Set initial state to empty
const intitialState = [];

// Function that takes in initial state and action
export default function(state = intitialState, action) {
  // Destructure and pull out type and payload from action
  const { type, payload } = action;

  // Evaluate action.type with switch statement
  switch (type) {
    case SET_ALERT:
      // copy state and add action.payload
      return [...state, payload];
    // Remove specific alert by id
    case REMOVE_ALERT:
      // Return state (array)
      // Filter through alerts to only remove specific alert
      // For each alert check to make sure alert.id is not equal to action.payload
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
