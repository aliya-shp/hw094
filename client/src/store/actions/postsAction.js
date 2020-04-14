import axiosApi from "../../axiosApi";

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';

export const createPostSuccess = postData => ({type: CREATE_POST_SUCCESS, postData});
export const editPostSuccess = postData => ({type: EDIT_POST_SUCCESS, postData});
export const fetchPostSuccess = post => ({type: FETCH_POST_SUCCESS});

export const fetchPostsSuccess = posts => ({type: FETCH_POSTS_SUCCESS, posts});

export const fetchTagsSuccess = tags => ({type: FETCH_TAGS_SUCCESS, tags});

export const createPost = postData => {
  return async dispatch => {
    const response = await axiosApi.post('/posts', postData);
    dispatch(createPostSuccess(response.data));
  }
};

export const editPost = postData => {
  return async dispatch => {
    const response = await axiosApi.patch('/posts', postData);
    dispatch(editPostSuccess(response.data));
  }
};

export const fetchPost = postId => {
  return async dispatch => {
    const response = await axiosApi.get('/posts', postId);
    dispatch(fetchPostSuccess(response.data));
  }
};

export const fetchPosts = () => {
  return async dispatch => {
    const response = await axiosApi.get('/posts');

    dispatch(fetchPostsSuccess(response.data));
  }
};

export const fetchTags = () => {
  return async dispatch => {
    const response = await axiosApi.get('/products/tags');

    dispatch(fetchTagsSuccess(response.data));
  }
};