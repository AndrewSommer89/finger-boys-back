import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from "../actions/types";

const intitialState = {
  //  users profiles and other users profile
  profile: null,
  // profile listing page
  profiles: [],
  // github repos **(not used)**
  repos: [],
  loading: true,
  error: {}
};

export default function(state = intitialState, action) {
  const { type, payload } = action;

  // User is authenticated give profile back their own profile
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        load: false
      };

    //There was an error when loading user's profile
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
}
