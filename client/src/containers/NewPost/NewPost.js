import React, {Component} from 'react';
import {createPost, fetchPosts, fetchTags} from "../../store/actions/postsAction";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PostForm from "../../components/PostForm/PostForm";

class NewProduct extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchTags();
  }

  createPost = async (postData) => {
    await this.props.createPost(postData);
    this.props.history.push('/');
  };

  render() {
    return (
      <>
        <Box pb={2} pt={2}>
          <Typography variant="h4">New post</Typography>
        </Box>
        <PostForm
          onSubmit={this.createPost}
          posts={this.props.posts}
          tags={this.props.tags}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  tags: state.posts.tags,
});

const mapDispatchToProps = dispatch => ({
  createPost: postData => dispatch(createPost(postData)),
  fetchPosts: () => dispatch(fetchPosts()),
  fetchTags: () => dispatch(fetchTags()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);