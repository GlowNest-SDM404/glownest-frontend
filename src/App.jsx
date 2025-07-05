// src/App.jsx
import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Glownest</h1>
      <Link to="/SignIn">Sign In</Link> | <Link to="/SignUp">Sign Up</Link>
    </div>
  );
};

export default App;
