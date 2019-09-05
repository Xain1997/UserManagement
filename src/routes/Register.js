import React from 'react';

import { FormErrors } from './FormErrors.js';
import "./Register.css";
import { Link } from 'react-router-dom';
//import  sqlite3  from 'sqlite3';
/*var sqlite3=require('sqlite3').verbose();
//var fs = require('fs'); 

var db = new sqlite3.Database(':memory:');
 
db.serialize(function() {
  db.run("CREATE TABLE lorem (info TEXT)");
 
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();
 
  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});
 
db.close();
*/
class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    formErrors: { email: '', password: '' },
    emailValid: false,
    passwordValid: false,
    formValid: false,
  }


  handleChange = (e) => {
    const re = /^\S*$/;
    const name = e.target.name;
    const value = e.target.value;
    if (re.test(e.target.value)) {
      this.setState({ [name]: value },
        () => { this.validateField(name, value) });
    }
  };

  handleonSubmit = () => {
    const { username, email, password } = this.state;

    if (this.state.formValid === true) {

      localStorage.setItem('email', email);
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      console.log("Correct");
    }
    else {

      console.log("incorrect");
    }


  };
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let usernameValid = this.state.usernameValid;

    switch (fieldName) {
      case 'username':
        usernameValid=value.match(/^([A-Za-z])[a-zA-Z0-9]*$/);
        fieldValidationErrors.username = usernameValid ? '' : ' is invalid';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = (value.length >= 8);
        fieldValidationErrors.password = passwordValid ? '' : ' is too short, Please add ' + (8 - value.length) + ' more';
        break;
      default:
        break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    console.log(this.state.formValid);
  }


  render() {
    return (

      <div className="box ">
        <div className="h"><b>Registeration Form:</b></div>
        <FormErrors formErrors={this.state.formErrors} />
        <div  >
          <input
            className="ibox"
            name='username'
            placeholder='Username'
            onChange={this.handleChange}
            value={this.state.username} />
        </div>
        <div>

          <input
            className="ibox"
            name='email'
            placeholder='Email'
            onChange={this.handleChange}
            value={this.state.email} />
        </div>
        <div >

          <input
            className="ibox"
            name='password'
            placeholder='Password'
            type='password'
            onChange={this.handleChange}
            value={this.state.password} />
        </div>
        <div>
          <Link to={'/login'}><button className="butt"><b>Go to Login</b></button></Link>
          <button className="butt" onClick={() => this.handleonSubmit()} type="primary"><b>Register</b></button>
        </div>
      </div>
    );
  }
}


export default (Register);