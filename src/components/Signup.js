import React, { Component } from "react";
import fire from "../config/Fire";
import { Link, navigate } from "@reach/router";
import * as api from "../api.js";
import CanvasTestMessage from "./CanvasTestMessage";

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
    const { email, password, username, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({ errMsg: "Passwords do not match." });
    } else {
      fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(data => {
          api.postUser({
            firebase_id: data.user.uid,
            username,
            display_pic_url: "https://i.imgur.com/MffRKW2.jpg",
          });
          navigate("/");
        })
        .catch(
          err => {
            if (email === "") {
              this.setState({ errMsg: "Please enter a valid email" }, () => {
                setTimeout(() => {
                  this.setState({ errMsg: "" });
                }, 3000);
              });
            } else if (password === "") {
              this.setState({ errMsg: "Please enter a password" }, () => {
                setTimeout(() => {
                  this.setState({ errMsg: "" });
                }, 3000);
              });
            } else if (username === "") {
              this.setState({ errMsg: "Please enter a username" }, () => {
                setTimeout(() => {
                  this.setState({ errMsg: "" });
                }, 3000);
              });
            } else {
              this.setState({ errMsg: err.message }, () => {
                setTimeout(() => {
                  this.setState({ errMsg: "" });
                }, 3000);
              });
            }
          },
          () => {
            setTimeout(() => {
              this.setState({ errMsg: "" });
            }, 3000);
          }
        );
    }
  }

  render() {
    return (
      <div className="login">
        <div className="login-tile">
          <h1>
            <span className="geo">geo</span>GRAFFITI
          </h1>
          <form>
            <label>
              Email address:{" "}
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
              Password:{" "}
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
              Confirm Password:{" "}
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
              Username:{" "}
              <input
                value={this.state.username}
                onChange={this.handleChange}
                type="text"
                name="username"
                placeholder="Username"
                required
              />
            </label>
            <button onClick={this.signup}>Sign Up</button>
          </form>

          {this.state.errMsg && (
            <CanvasTestMessage message={this.state.errMsg} type="error" />
          )}

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
