import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const SUBSCRIBE_TO_USER_SUCCESS = 'SUBSCRIBE_TO_USER';
export const UNSUBSCRIBE_TO_USER_SUCCESS = 'UNSUBSCRIBE_TO_USER';
export const FETCH_SUBSCRIPTIONS_SUCCESS = 'FETCH_SUBSCRIPTIONS';

export const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
export const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
export const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

export const subscribeToUserSuccess = username => ({type: SUBSCRIBE_TO_USER_SUCCESS, username});
export const unsubscribeToUserSuccess = username => ({type: UNSUBSCRIBE_TO_USER_SUCCESS, username});
export const fetchSubscriptionsSuccess = subscriptions => ({type: FETCH_SUBSCRIPTIONS_SUCCESS, subscriptions});

export const registerUser = userData => {
  return async dispatch => {
    try {
      dispatch(registerUserRequest());
      await axiosApi.post('/users', userData);
      dispatch(registerUserSuccess());
      dispatch(push('/'));
    } catch (error) {
      if (error.response) {
        dispatch(registerUserFailure(error.response.data));
      } else {
        dispatch(registerUserFailure({global: 'Network error or no internet'}));
      }
    }
  }
};

export const loginUser = userData => {
  return async dispatch => {
    try {
      dispatch(loginUserRequest());
      const response = await axiosApi.post('/users/sessions', userData);
      dispatch(loginUserSuccess(response.data));
      dispatch(push('/'));
    } catch (error) {
      dispatch(loginUserFailure(error.response.data));
    }
  }
};

export const loginWithFacebook = facebookData => {
  return async dispatch => {
    const response = await axiosApi.post('/users/facebook', facebookData);

    console.log('here');
    dispatch(loginUserSuccess(response.data));
    dispatch(push('/'));
  };
};

export const logoutUser = () => {
  return async dispatch => {
    await axiosApi.delete('/users/sessions');

    dispatch(logoutUserSuccess());
    dispatch(push('/'));
  }
};

export const editProfile = profileData => {
  return async dispatch => {
    const response = await axiosApi.patch('/users/profile', profileData);
    dispatch(loginUserSuccess(response.data));
    dispatch(push('/'));
  }
};

export const subscribeToUser = username => {
  return async dispatch => {
    const response = await axiosApi.post('/users/subscribe', username);
    dispatch(subscribeToUserSuccess(response.data));
    dispatch(push('/posts'));
  }
};

export const unsubscribeToUser = username => {
  return async dispatch => {
    const response = await axiosApi.delete('/users/subscribe', username);
    dispatch(unsubscribeToUserSuccess(response.data));
    dispatch(push('/posts'));
  }
};

export const fetchSubscriptions = () => {
  return async dispatch => {
    const response = await axiosApi.get('/users/subscribe');
    dispatch(fetchSubscriptionsSuccess(response.data));
    dispatch(push('/posts'));
  }
};