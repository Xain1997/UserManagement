import React from 'react';
import {Redirect} from 'react-router-dom';
import { FormErrors } from './FormErrors.js';
import "./Register.css";


class Pass extends React.Component {
  state = {
    password: '',
    password4: '',
    formErrors: { password: '' },
    passwordValid: false,
    formValid: false,
    isloader: false
  }

  handleChange = (e) => {
    const re = /^\S*$/;
    const name = e.target.name;
    const value = e.target.value;
    if (re.test(e.target.value)) {
      this.setState({ [name]: value },
        () => { this.validateField(name, value) });
    }
  }

  handleonSubmit = () => {
    const { password} = this.state;
    if(this.state.password !== this.state.password4){
     alert("The passwords doesn't match")
      return false; // The form won't submit
  }
  else
      if (this.state.formValid === true) {
      localStorage.setItem('password', password);
      this.setState({
        isloader:true
      })
    }
    else {

      console.log("incorrect");
    }
  };
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'password':
        passwordValid = (value.length >= 8);
        fieldValidationErrors.password = passwordValid ? '' : ' is too short, Please add ' + (8 - value.length) + ' more';
        break;
      default:
        break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.passwordValid });
    console.log(this.state.formValid);
  }


  render() {
    const { isloader } = this.state;
    if (isloader){
      return <Redirect to={"/login"} />;
    } 
    
    else {
      return (
        <div className="box ">
          <div className="h"><b>Password Reset Form:</b></div>
          <FormErrors formErrors={this.state.formErrors} />
          <div >
            <input
              className="ibox"
              name='password'
              placeholder='Password'
              type='password'
              onChange={this.handleChange}
              value={this.state.password} />
          </div>
          <div >
            <input
              className="ibox"
              name='password4'
              placeholder='ReEnter Password'
              type='password'
              onChange={this.handleChange}
              value={this.state.password4} />
          </div>

          <div>
            <button className="butt" onClick={() => this.handleonSubmit()} type="primary"><b>Confirm Password</b></button>
          </div>
        </div>
      );
    }
  }
}


export default (Pass);