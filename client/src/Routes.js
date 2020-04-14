import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import UserProfile from "./containers/UserProfile/UserProfile";

const ProtectedRoute = ({isAllowed, ...props}) => (
  isAllowed ? <Route {...props}/> : <Redirect to="/login"/>
);

const Routes = () => {
  const user = useSelector(state => state.users.user);

  return (
    <Switch>
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <ProtectedRoute isAllowed={user} path="/profile" exact component={UserProfile} />
      {/*<ProtectedRoute isAllowed={user} path="/" exact component={Posts} />*/}
    </Switch>
  );
};

export default Routes;