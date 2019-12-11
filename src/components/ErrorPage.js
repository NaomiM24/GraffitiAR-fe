import React from "react";
import { Link } from "@reach/router";

const ErrorPage = () => {
  return (
    <div>
      <Link to="/">
        <p>Page not found. Back to homepage?</p>
      </Link>
    </div>
  );
};

export default ErrorPage;
