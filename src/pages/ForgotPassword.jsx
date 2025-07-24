import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bg from "../assets/img/back.webp";

// Styles
import "../styles/AuthPage.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
    navigate("/resetPass");
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${bg})` }}>
      <div className="auth-inner-container">
        {/* Logo */}
        <div
          className="auth-logo-container"
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          <h1 className="glow-nest-logo">
            <span style={{ color: "#000" }}>Glow</span>
            <span style={{ color: "#FF6B6B" }}>Nest</span>
          </h1>
        </div>

        {/* Heading */}
        <h2 className="auth-heading">Forgot Password</h2>

        <form onSubmit={handleReset} className="auth-form">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            // required
          />

          <button type="submit" className="auth-submit-button">
            Send Reset Link
          </button>

          <p className="auth-already-account-text">
            Remember your password?{" "}
            <Link to="/signin" className="auth-link">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
