import React from "react";
import { Link } from "@reach/router";

const RedirectLogin = () => {
  return (
    <>
      <Link to="/">
        <h1>Did you forget to login?</h1>
      </Link>
    </>
  );
};

export default RedirectLogin;
