import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bg from '../assets/img/back.webp';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('')

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Signed in with', { email, password });
  };

  return (
    <div style={styles.container}>
        <h1 style={{
             fontSize: '28px',
            //  marginBottom: '20px',
            fontWeight: 'bold',
            color:'#FF6B6B'
        }}>Sign Up</h1>
      <div style={styles.innerContainer}>
        <h1 style={styles.logo}>
          <span style={{ color: '#000' }}>Glow</span>
          <span style={{ color: '#FF6B6B' }}>Nest</span>
        </h1>

        <form onSubmit={handleSignIn} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
           <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>Log in</button>

          <div style={styles.socialContainer}>
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" style={styles.icon} />
            <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" style={styles.icon} />
            <img src="https://img.icons8.com/color/48/000000/twitter--v1.png" alt="Twitter" style={styles.icon} />
          </div>

          <p style={styles.text}>
            Already have an account? <Link to="/signIn" style={styles.link}>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#f44336', // fallback red if image doesn't load
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffffcc', // semi-transparent white
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
    width: '300px',
  },
  logo: {
    fontSize: '28px',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    padding: '12px',
    marginBottom: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    backgroundColor: '#FF6B6B',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  socialContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  icon: {
    width: '30px',
    cursor: 'pointer',
  },
  text: {
    marginTop: '20px',
    fontSize: '14px',
    textAlign: 'center',
  },
  link: {
    color: '#FF6B6B',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default SignUp;
