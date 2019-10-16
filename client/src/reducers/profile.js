import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE
} from "../actions/types";

const intitialState = {
  //  users profiles and other users profile
  profile: null,
  // profile listing page
  profiles: [],
  loading: true,
  error: {}
};

export default function(state = intitialState, action) {
  const { type, payload } = action;

  // User is authenticated give profile back their own profile
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        load: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
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
