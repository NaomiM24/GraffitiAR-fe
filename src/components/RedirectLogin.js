import React from "react";
import { Link } from "@reach/router";

const RedirectLogin = () => {
  return (
    <div className="not-logged-in">
      <div className="not-logged-in-tile">
        <h1>
          Sorry, you can't see this page because you haven't logged in yet!
        </h1>
        <Link to="/">
          <p>Click here to go to the log in page</p>
        </Link>
        <p>or</p>
        <Link to="/signup">
          <p>Click here to go to the sign up page</p>
        </Link>
      </div>
    </div>
  );
};

export default RedirectLogin;
