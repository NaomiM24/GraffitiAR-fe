import React, { Component } from "react";
import fire from "../config/Fire";
import { Link, navigate } from "@reach/router";

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
          console.log(
            data.user.uid
          ); /* send username and uid to back end database */
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
      <div>
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
        </form>
        {this.state.errMsg && <p>{this.state.errMsg}</p>}
        <p>Already have an account?</p>
        <Link to="/">Log In</Link>
      </div>
    );
  }
}
export default Signup;
