import React, { useEffect, useRef, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";
import StudentContext from "../context/StudentContext";

const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

const Navbar = ({ darkMode, toggleTheme }) => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const dropdownRef = useRef();
  const { user } = useContext(StudentContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userType");
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, [location]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileNav = () => setMobileNavOpen(!mobileNavOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setIsAuthenticated(false);
    setUserRole(null);
    setDropdownOpen(false);
    navigate(userRole === "student" ? "/student-login" : "/admin-login");
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

  const navItems = [
    { to: "/", icon: "fa-house", label: "Home" },
    { to: "/contact", icon: "fa-envelope", label: "Contact" },
    !isAuthenticated && { to: "/student-login", icon: "fa-user-graduate", label: "Student" },
    !isAuthenticated && { to: "/admin-login", icon: "fa-user-shield", label: "Admin" },
  ].filter(Boolean);

  return (
    <nav className={`custom-navbar ${darkMode ? "dark" : "light"}`}>
      <div className="container nav-content">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="logo-text">
            <i className="fa-solid fa-users-gear"></i> SMS
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-list compact-nav ${mobileNavOpen ? "open" : ""}`}>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`nav-item ${location.pathname === item.to ? "active" : ""}`}
              onClick={() => setMobileNavOpen(false)}
            >
              <Link to={item.to} className="nav-icon-link">
                <i className={`fa-solid ${item.icon}`}></i>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Controls */}
        <div className="right-controls">
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {darkMode ? <BsSun size={22} /> : <BsMoon size={22} />}
          </button>

          {isAuthenticated && (
            <div className="avatar-dropdown" ref={dropdownRef}>
              {user?.avatar ? (
                <img
                  src={`${API_BASE_URL}${user.avatar}`}
                  alt="User Avatar"
                  className="avatar-img"
                  onClick={toggleDropdown}
                  style={{
                    cursor: "pointer",
                    objectFit: "cover",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <div
                  className="avatar-img"
                  style={{
                    width: 40,
                    height: 40,
                    background: "#e0e0e0",
                    fontSize: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    userSelect: "none",
                    cursor: "pointer",
                  }}
                  onClick={toggleDropdown}
                >
                  {getInitial(user?.name)}
                </div>
              )}
              {dropdownOpen && (
                <div className="dropdown-menu">
                  {location.pathname === "/profile" ? (
                    <>
                      <Link to="/" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <i className="fa-solid fa-house"></i> Home
                      </Link>
                      {userRole === "admin" && (
                        <Link to="/admin-panel" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                          <i className="fa-solid fa-table-columns"></i> Dashboard
                        </Link>
                      )}
                      <button className="dropdown-item logout-btn" onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <i className="fa-solid fa-user"></i> Profile
                      </Link>
                      {userRole === "admin" && (
                        <Link to="/admin-panel" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                          <i className="fa-solid fa-table-columns"></i> Dashboard
                        </Link>
                      )}
                      <button className="dropdown-item logout-btn" onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i> Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger Menu */}
          <div className="hamburger-icon" onClick={toggleMobileNav}>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>

      </div>
    </nav>
  );
};

export default Navbar;
