import React, { Component } from "react";
import fire from "../config/Fire";
import { Link, navigate } from "@reach/router";
import * as api from "../api.js";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      errMsg: "",
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  signup(event) {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ errMsg: "Passwords do not match." });
    } else {
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(data => {
          api.postUser({
            firebase_id: data.user.uid,
            username: this.state.username,
            display_pic_url: "https://imgur.com/a/adw37ZP",
          });
          navigate("/");
        })
        .catch(err => {
          console.log(err);
          this.setState({ errMsg: err.message });
        });
    }
  }

  render() {
    return (
      <div className="login">
        <div className="login-tile">
          <h1>geoGRAFFITI</h1>
          <form>
            <label>
              Email address
              <input
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                required
              />
            </label>
            <label>
              Password
              <input
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </label>
            <label>
              Confirm Password
              <input
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
              />
            </label>
            <label>
              Username
              <input
                value={this.state.username}
                onChange={this.handleChange}
                type="text"
                name="username"
                placeholder="Username"
                required
              />
            </label>
            <button onClick={this.signup}>Signup</button>
            {this.state.errMsg && <p>{this.state.errMsg}</p>}
          </form>
          <section>
            <p>Already have an account?</p>
            <Link to="/">Log In</Link>
          </section>
        </div>
      </div>
    );
  }
}
export default Signup;
