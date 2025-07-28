import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import bg from "../assets/img/back.webp";

// Styles
import "../styles/AuthPage.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_DATABASE_URL}/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      }
    );

    if (response.ok) {
      setMessage("Your password has been reset successfully.");

      localStorage.removeItem("jwt");
      navigate("/");
    } else {
      setMessage("Error resetting password.");
    }
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
        <h2 className="auth-heading">Reset Password</h2>

        <form onSubmit={handleReset} className="auth-form">
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="auth-input"
            required
          />

          <button type="submit" className="auth-submit-button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
