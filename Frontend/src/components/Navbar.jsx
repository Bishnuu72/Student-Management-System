import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";

const navItems = [
  { to: "/", icon: "fa-house", label: "Home" },
  { to: "/about", icon: "fa-circle-info", label: "About" },
  { to: "/contact", icon: "fa-envelope", label: "Contact" },
  { to: "/student-login", icon: "fa-user-graduate", label: "Student" },
  { to: "/admin-login", icon: "fa-user-shield", label: "Admin" },
];

const Navbar = ({ darkMode, toggleTheme }) => {
  const location = useLocation();

  return (
    <nav className={`custom-navbar ${darkMode ? "dark" : "light"}`}>
      <div className="nav-content">
        {/* Left: Logo */}
        <div className="logo">
          <Link to="/" className="logo-text">
            <i className="fa-solid fa-users-gear"></i> SMS
          </Link>
        </div>

        {/* Center: Nav Icons */}
        <ul className="nav-list compact-nav">
          {navItems.map((item, index) => (
            <li key={index} className={`nav-item ${location.pathname === item.to ? "active" : ""}`}>
              <Link to={item.to} className="nav-icon-link">
                <i className={`fa-solid ${item.icon}`}></i>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Theme Toggle */}
        <div className="theme-icon">
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {darkMode ? <BsSun size={22} /> : <BsMoon size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
