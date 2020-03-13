import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Login } from "./screens/login";
import { Register } from "./screens/register";
import { Dashboard } from "./screens/dashboard";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (!!localStorage.getItem("token") ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);

const updateToken = token => {
  localStorage.setItem("token", token);
};

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" render={props => <Login updateToken={updateToken} {...props} />} />
        <Route path="/register" render={props => <Register updateToken={updateToken} {...props} />} />
        <PrivateRoute path="/" exact component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
