import React, { Component } from "react";
import fire from "../config/Fire";
import { Link } from "@reach/router";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: "",
      password: "",
      errMsg: "",
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  login(event) {
    const { email, password } = this.state;
    event.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ errMsg: "" });
      })
      .catch(() => {
        if (email === "") {
          this.setState({ errMsg: "Please enter your email" });
        } else if (password === "") {
          this.setState({ errMsg: "Please enter your password" });
        } else {
          this.setState({ errMsg: "Your username or password is incorrect" });
        }
      });
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

            <button type="submit" onClick={this.login}>
              Login
            </button>
          </form>

          {this.state.errMsg && (
            <div className="loginError">
              <img src="/icon.png" />
              <p>{this.state.errMsg}</p>
            </div>
          )}

          <section>
            <p>Don't have an account?</p>
            <Link to="/signup">Sign Up</Link>
          </section>
        </div>
      </div>
    );
  }
}
export default Login;
