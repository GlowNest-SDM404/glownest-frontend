import { useState } from "react";
import { Link } from "react-router-dom";
import bg from "../assets/img/back.webp";

// Styles
import "../styles/AuthPage.css";

// Components
import SocialContainer from "../components/SocialContainer";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Signed in with", { email, password });
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${bg})` }}>
      <div className="auth-inner-container">
        <h1 className="glow-nest-logo">
          <span style={{ color: "#000" }}>Glow</span>
          <span style={{ color: "#FF6B6B" }}>Nest</span>
        </h1>

        <form onSubmit={handleSignIn} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />

          <button type="submit" className="auth-submit-button">
            Log in
          </button>

          <SocialContainer />

          <p className="auth-already-account-text">
            Already have an account?{" "}
            <Link to="/signin" className="auth-link">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
