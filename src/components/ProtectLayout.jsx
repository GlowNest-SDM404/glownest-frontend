import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import "../styles/Navbar.css";

export default function ProtectedLayout() {
  return (
    <>
      {/* Render the current route's component */}
      <header className="home-logo-container">
        <Navbar />
      </header>
      <Outlet />
    </>
  );
}
