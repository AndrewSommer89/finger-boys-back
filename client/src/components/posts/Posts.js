import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/post";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    // Call get getPosts() as soon component loads
    getPosts();
    // add "[]" to make function load only once
  }, [getPosts]);
  // If page loading return spinner else return the fragment with the content in it
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Welcome to the community
      </p>
      <PostForm />
      <div className="posts">
        {posts.map(post => (
          <PostItem
            // Pass in the post._id as the key
            key={post._id}
            // Pass in the post as the post
            post={post}
          />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
