import React from 'react';
import { Link } from 'react-router-dom';
import "./Register.css";
class Login extends React.Component {
  state = {
    email1: '',
    password1: '',
    isload: false
  }

  onChange = (e) => {
    const re = /^\S*$/;
    const name = e.target.name;
    const value = e.target.value;
    if (re.test(e.target.value)) {
      this.setState({ [name]: value });
    }
  };



  onSubmit = () => {
    const name = localStorage.getItem('username');
    const mail = localStorage.getItem('email');
    const pass = localStorage.getItem('password');

    if (((this.state.email1 === mail) || (this.state.email1 === name)) && this.state.password1 === pass) {
      console.log("Login");
    }
    else {
      alert("Incorrect Email/UserName or Password")
      console.log("incorrect");
    }
  };

  render() {
    return (
      <div className="box">
        <div className="h"><b>Login Form:</b></div>
        <div>
          <input
            className="ibox"
            name='email1'
            placeholder='Email'
            onChange={this.onChange}
            value={this.state.email1} />
        </div>
        <div>
          <input
            className="ibox"
            name='password1'
            placeholder='Password'
            type='password'
            onChange={this.onChange}
            value={this.state.password1} />
        </div>
        <div>
          <Link to='/forget'
            name='forget'
            checked={this.state.isAdmin1}
            onChange={this.onChange}>
            Forget Password?
        </Link>
        </div>
        <div>
          <Link to={'/register'}><button className="butt"><b>Go to Registeration</b></button></Link>
          <button className="butt" onClick={() => this.onSubmit()} type="primary"><b>Login</b></button>
        </div>

      </div>
    );
  }
}


export default (Login);