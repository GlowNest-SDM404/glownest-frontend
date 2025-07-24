import { useState, useEffect,} from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/img/back.webp";

// Styles
import "../styles/AuthPage.css";

// Components
import SocialContainer from "../components/SocialContainer";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login"; // Set page title
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Signed in with", { email, password });
    navigate("/home"); 
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${bg})` }}>
      <div className="auth-inner-container">

        {/* Logo moved to top */}
        <div className="auth-logo-container">
          <h1 className="glow-nest-logo">
            <span style={{ color: "#000" }}>Glow</span>
            <span style={{ color: "#FF6B6B" }}>Nest</span>
          </h1>
        </div>

        {/* Optional heading */}
        <h2 className="auth-heading">
          Login
        </h2>

        <form onSubmit={handleSignIn} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            // required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            // required
          />

          <button type="submit" className="auth-submit-button">
            Log in
          </button>

           <p className="forgot">
            <Link to="/forgotPass" className="auth-link">
           forgot password?{" "}
          
            </Link>
          </p>
          <SocialContainer />

          <p className="auth-already-account-text">
            Don’t have an account?{" "}
            <Link to="/signup" className="auth-link">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
