import React from 'react';
import { Link } from 'react-router-dom';
//import * as emailjs from 'emailjs-com';
import "./Register.css";
import { AuthContext } from './AuthContext';


//import Auth from './Auth';

class Forget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      email2: localStorage.getItem('email'),
      redirectToReferrer: false,
      isLoaded: false,
      isload: false,
      isloade: false
    }
  }


  onChange = (e) => {
    const re = /^\S*$/;
    const name = e.target.name;
    const value = e.target.value;
    if (re.test(e.target.value)) {
      this.setState({ [name]: value });
    }
  };

  SonChange = (e) => {
    const re = /^[0-9\b]*$/;
    const name = e.target.name;
    const value = e.target.value;
    if (re.test(e.target.value)) {
      this.setState({ [name]: value });
    }
  };


  onSubmit = () => {

    const a = localStorage.getItem('email');
    const b = localStorage.getItem('username');

    if ((this.state.email2 === a) || this.state.email2 === b) {
      let val = Math.floor(1000 + Math.random() * 9000);
      this.setState({
        val,
        code: val,
        isLoaded: true
      });
      console.log(val);
      /*emailjs.init("user_h1FVRBCoi0y1yarra22cE");
      emailjs.send("gmail", "Zain", { email: this.state.email, name: "zain", code: val, toname: b }).then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function (error) {
        console.log('FAILED...', error);
      });*/
    }
    else {
      alert("Invalid Email");

    }
  };


  SonSubmit = () => {

    if ((this.state.code.toString()) === (this.state.val.toString())) {

      this.setState({ isloade: true });
      console.log("Correct");
    }
    else {
      alert("Incorrect Code");
      console.log("incorrect");
    }
  };

  render() {

    const { isLoaded } = this.state;
    //const { isload } = this.state;
    const { isloade } = this.state;

    if (isloade) {
      return (

        <AuthContext.Consumer>
          {(Auth) => {
            Auth.signin(() => { this.props.history.push('/auth') });
          }
          }
        </AuthContext.Consumer>
      );
    }
    else if (isLoaded) {
      return (
        <div className="box">
          <div className="h"><b>Password Reset Form:</b></div>
          <div>
            <input
              className="ibox"
              maxLength='4'
              name='code'
              placeholder='Code'
              onChange={this.SonChange}
              value={this.state.code} />
          </div>
          <div>

            <button className="butt" onClick={() => this.SonSubmit()} ><b>Confirm</b></button>
          </div>

        </div>
      );
    }
    else {
      return (
        <div className="box">
          <div className="h"><b>Password Reset Form:</b></div>
          <div>
            <input
              className="ibox"
              name='email2'
              placeholder='Email'
              onChange={this.onChange}
              value={this.state.email2} />
          </div>
          <div>
            <Link to={'/register'}><button className="butt"><b>Go to Registeration</b></button></Link>
            <Link to={'/login'}><button className="butt"><b>Go to Login</b></button></Link>
            <button className="butt" onClick={() => this.onSubmit()} type="primary"><b>Send Code to Email</b></button>
          </div>
        </div>
      );
    }
  }
}
export default (Forget);