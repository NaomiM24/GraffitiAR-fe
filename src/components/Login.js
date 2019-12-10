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
    event.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => {
        console.log(err);
        this.setState({ errMsg: err.message });
      });
  }

  render() {
    return (
      <div className="login">
        <div className="login-tile">
          <h1>geoGRAFFITI</h1>
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
            {this.state.errMsg && <p>{this.state.errMsg}</p>}
          </form>

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
