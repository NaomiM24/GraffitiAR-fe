import React from 'react';
import './App.css';
// import CanvasComponent from './components/CanvasComponent'
import CanvasTest from './components/CanvasTest';
import NavBar from './components/NavBar';
import { Router } from "@reach/router"
import Map from './components/Map';
import AR from './components/AR';


export default function App() {
  return (
    <div className="App">
      <main className="App-main">
        <h1 className="App-header">
          Graffiti ARtist
        </h1>
      <NavBar className="App-navbar"/>
        
        {/* <CanvasComponent /> */}
        <Router className="App-router">
          <CanvasTest path='/canvas' className="App-router"/>
          <Map path='/map' className="App-router"/>
          <AR path='/ar'/>
        </Router>
        
       
      </main>
    </div>
  );
}

