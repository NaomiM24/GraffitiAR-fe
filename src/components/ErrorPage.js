import React from "react";
import { Link } from "@reach/router";
import errorpage from "../assets/errorpage.jpg";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <Link to="/">
        <>
          <p>Oops! This page doesn't exist yet.</p>
          <p>Go back to homepage?</p>
          <img src={errorpage} alt="404 not found" />
        </>
      </Link>
    </div>
  );
};

export default ErrorPage;
