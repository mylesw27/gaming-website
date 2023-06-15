'use client'
import Navigation from "../../components/Navigation/page";
import React from "react";
import LoggingIn from "../../components/LoggingIn/page";

const Login = () => {
  return (
    <div>
      <Navigation />
      <h2>Login</h2>
      <p>Please sign-in</p>
      <LoggingIn />
    </div>
  );
};

export default Login;
