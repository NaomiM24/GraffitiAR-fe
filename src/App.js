import "./App.css";
import CanvasTest from "./components/CanvasTest";
import NavBar from "./components/NavBar";
import { Router } from "@reach/router";
import Map from "./components/Map";
import AR from "./components/AR";
import React, { Component } from "react";
import fire from "./config/Fire";
import Login from "./components/Login";
import Header from "./components/Header";
import Signup from "./components/Signup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        {!user ? (
          <Router>
            <Login path="/" />
            <Signup path="/signup" />
          </Router>
        ) : (
          <main className="App-main">
            <Header className="App-header" />
            <NavBar className="App-navbar" />
            <Router className="App-router">
              <CanvasTest path="/canvas" className="App-router" />
              <Map path="/" className="App-router" />
              <AR path="/ar" />
            </Router>
          </main>
        )}
      </div>
    );
  }
}

export default App;
