import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./styles.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import http from "./components/Https";

export default class App extends Component {
  constructor() {
    super();
    var token = localStorage.getItem("token");
    var user_name = localStorage.getItem("user_name");
    if (token && token.length > 0 && token !== "undefined") {
      // console.log("t " + token);
      http.defaults.headers.common["Authorization"] = "Bearer " + token;
      this.state = {
        isloggdin: true,
        token: token,
        user_name: { user_name }
      };
    } else {
      this.state = {
        isloggdin: false,
        token: null,
        user_name: {}
      };
    }
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  login = (token, user_name) => {
    http.defaults.headers.common["Authorization"] = "Bearer " + token;
    localStorage.setItem("user_name", user_name);
    localStorage.setItem("token", token);
    this.setState({
      isloggdin: true,
      token: token,
      user_name: user_name
    });
  };

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    this.setState({
      isloggdin: false,
      token: null,
      user_name: ""
    });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to={{ pathname: "/dashboard" }} />
            </Route>
            <LoginWrapper exact path="/login" config={this.state}>
              <Login login={this.login} logout={this.logout}/>
            </LoginWrapper>
            <PrivateRoute path="/dashboard" config={this.state}>
              <Dashboard logout={this.logout} />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        rest.config.isloggdin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );
}

function LoginWrapper({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !rest.config.isloggdin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard"
            }}
          />
        )
      }
    />
  );
}
