import React, { Component } from "react";
import fire from "../config/Fire";
import { Link } from "@reach/router";
import CanvasTestMessage from "./CanvasTestMessage";

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
          this.setState({ errMsg: "Please enter your email" }, () => {
            setTimeout(() => {
              this.setState({ errMsg: "" });
            }, 3000);
          });
        } else if (password === "") {
          this.setState({ errMsg: "Please enter your password" }, () => {
            setTimeout(() => {
              this.setState({ errMsg: "" });
            }, 3000);
          });
        } else {
          this.setState(
            { errMsg: "Your username or password is incorrect" },
            () => {
              setTimeout(() => {
                this.setState({ errMsg: "" });
              }, 3000);
            }
          );
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
            <CanvasTestMessage message={this.state.errMsg} type="error" />
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
