import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";
import userImg from "../assets/profile.jpg";

const navItems = [
  { to: "/", icon: "fa-house", label: "Home" },
  { to: "/about", icon: "fa-circle-info", label: "About" },
  { to: "/contact", icon: "fa-envelope", label: "Contact" },
  { to: "/student-login", icon: "fa-user-graduate", label: "Student" },
  { to: "/admin-login", icon: "fa-user-shield", label: "Admin" },
];

const Navbar = ({ darkMode, toggleTheme }) => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLogout = () => {
    // Your logout logic here
    alert("Logged out");
  };

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

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

        {/* Right: Theme Toggle + Avatar */}
        <div className="right-controls">
          <div className="theme-icon">
            <button onClick={toggleTheme} className="theme-toggle-btn">
              {darkMode ? <BsSun size={22} /> : <BsMoon size={22} />}
            </button>
          </div>

          <div className="avatar-dropdown" ref={dropdownRef}>
            <img
              src={userImg}
              alt="User Avatar"
              className="avatar-img"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  <i className="fa-solid fa-user"></i> Profile
                </Link>
                <Link to="/dashboard" className="dropdown-item">
                  <i className="fa-solid fa-table-columns"></i> Dashboard
                </Link>
                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
