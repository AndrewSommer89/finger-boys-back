// Takes in token
// If token is there add it to the headers
// If token is not there, delete token from headers

import axios from "axios";

const setAuthToken = token => {
  // Check for token
  // Is token
  if (token) {
    // Set the global header to the token
    axios.defaults.headers.common["x-auth-token"] = token;
  }
  // Is not token
  else {
    // Delete what is passed in
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
