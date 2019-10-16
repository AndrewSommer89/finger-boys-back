import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "./types";

//Get Posts
export const getPosts = () => async dispatch => {
  try {
    // Make get request to "api/posts" on the backend
    const res = await axios.get("/api/posts");

    // Dispatch redux action
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    // If there is an errror dispatch POST_ERROR
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = postId => async dispatch => {
  try {
    // Make request to "/api/posts/like/${postId}" on the backend
    const res = await axios.put(`/api/posts/like/${postId}`);

    // Dispatch redux action
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (err) {
    // If there is an errror dispatch POST_ERROR
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = postId => async dispatch => {
  try {
    // Make PUT request to "/api/posts/unlike/${postId}" on the backend
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    // Dispatch redux action
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (err) {
    // If there is an errror dispatch POST_ERROR
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Post
export const deletePost = postId => async dispatch => {
  try {
    // Make delete request to "/api/posts/${postId}" on the backend
    await axios.delete(`/api/posts/${postId}`);

    // Dispatch redux action
    dispatch({
      type: DELETE_POST,
      payload: postId
    });

    // Show alert on screen that reads "Post Removed" with "success" style
    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    // If there is an errror dispatch POST_ERROR
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Posts
export const addPost = FormData => async dispatch => {
  // Since we are sending data create config object with our headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    // Make POST request to "/api/posts/" on the backend, pass in FormData and config
    const res = await axios.post(`/api/posts`, FormData, config);

    // Dispatch redux action
    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    // Make alert show on screen that reads "Post Created", with success style
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    // If there is an errror dispatch POST_ERROR
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Post
export const getPost = id => async dispatch => {
  try {
    // Make GET request to "/api/posts/${id}" on the backend
    const res = await axios.get(`/api/posts/${id}`);

    // Dispatch redux action
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    // If there is an errror dispatch POST_ERROR
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Comment
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    // Make POST request to "/api/posts/comment/${postId}" on the backend, pass in formData and config
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    // Dispatch redux action
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    // Make alert show on screen that reads "Comment Added", with success style
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    // If there is an errror dispatch POST_ERROR
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    // Make DELETE request to "/api/posts/comment/${postId}/${postId}" on the backend, pass in formData
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`, FormData);

    // Dispatch redux action
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    // Make alert show on screen that reads "Comment Removed", with success style
    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    // If there is an errror dispatch POST_ERROR
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
