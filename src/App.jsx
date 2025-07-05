// src/App.jsx
import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Glownest</h1>
      <Link to="/signin">Sign In</Link> | <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default App;
