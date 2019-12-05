import React from "react";
import { Link } from "@reach/router";

export default function NavBar() {
  return (
    <nav>
      <Link to="/canvas">
        <img src="/street-art.png" alt="canvas" className="nav-img" />
      </Link>
      <Link to="/map">
        <img src="/map.png" alt="map" className="nav-img" />
      </Link>
      <Link to="/ar">AR</Link>
    </nav>
  );
}
