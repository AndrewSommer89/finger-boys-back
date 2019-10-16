import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";

// Combine all reducers and export them
export default combineReducers({
  alert,
  auth,
  profile,
  post
});
