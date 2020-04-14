import React, {useState} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {editProfile} from "../../store/actions/usersActions";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {apiURL} from "../../constants";
import person from "../../assets/images/person.png";
import Box from "@material-ui/core/Box";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  const [state, setState] = useState({
    password: '',
    avatar: null,
    display_name: user.display_name || '',
  });

  let anonymousAvatar = person;

  const onSubmit = e => {
    e.preventDefault();

    const profileData = new FormData();

    Object.keys(state).forEach(key => {
      profileData.append(key, state[key]);
    });

    dispatch(editProfile(profileData));
  };

  const onChange = e => {
    setState({...state, [e.target.name]: e.target.value});
  };

  const onFileChange = e => {
    setState({...state, [e.target.name]: e.target.files[0]});
  };

  return (
    <Container maxWidth="sm">
      <Box pb={2} pt={2}>
        <Typography variant="h4">Change user data</Typography>
      </Box>
      <form onSubmit={onSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <FormElement
              type="password"
              propertyName="password"
              title="Change password"
              onChange={onChange}
              value={state.password}
            />
          </Grid>
          <Grid item xs>
            <FormElement
              type="text"
              propertyName="display_name" required
              title="Display Name"
              onChange={onChange}
              value={state.display_name}
            />
          </Grid>
          <Grid item xs>
            {user.avatar ? <img src={apiURL + '/' + user.avatar} alt={user.username} style={{maxWidth: '100px'}}/>
              : <img src={anonymousAvatar} alt={user.username} style={{maxWidth: '100px'}}/>}
          </Grid>
          <Grid item xs>
            <FormElement
              type="file"
              propertyName="avatar"
              title="Avatar"
              onChange={onFileChange}
            />
          </Grid>
          <Grid item xs>
            <Button type="submit" color="primary" variant="contained">Save</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UserProfile;