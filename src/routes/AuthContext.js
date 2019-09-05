import React, { createContext } from "react";
import { Cookies } from "../utils";

export const AuthContext = createContext({
  isAuthenticated: null,
  signin: (value) => { }
});

export class AuthContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signin: this.signinUser,
      isAuthenticated: Cookies.get('authtoken') !== null
    };
    console.log(this.state.isAuthenticated)
  }

  signinUser = (callback) => {
    this.setState({
      isAuthenticated: true
    }, () => {
      callback()
    });
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}