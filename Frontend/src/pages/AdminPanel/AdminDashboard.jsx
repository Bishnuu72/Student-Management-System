import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import userImg from '../../assets/profile.jpg';

const AdminDashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Add actual logout logic here
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        avatarRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !avatarRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="admin-profile">
          <img
            src={userImg}
            alt="User Avatar"
            className="avatar-img"
            // Removed onClick
          />
          <p className="admin-email">admin@gmail.com</p>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li className="active"><i className="fa-solid fa-gauge"></i> Dashboard</li>
            <li><i className="fa-solid fa-book"></i> Courses</li>
            <li><i className="fa-solid fa-user-graduate"></i> Students</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <div className="top-headbar">
          <div className="welcome-message">Welcome to the Admin Dashboard!</div>
          <div className="admin-profile top-avatar" ref={avatarRef}>
            <img
              src={userImg}
              alt="User Avatar"
              className="avatar-img"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="dropdown-menu" ref={dropdownRef}>
                <Link to="/" className="dropdown-item">
                  <i className="fa-solid fa-house"></i> Home
                </Link>
                <Link to="/profile" className="dropdown-item">
                  <i className="fa-solid fa-user"></i> Profile
                </Link>
                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div className="report-summary">
          <div className="report-header">
            <h3>Report Summary</h3>
            <span className="refresh-icon"><i className="fa-solid fa-rotate"></i> Updated Report</span>
          </div>
          <div className="summary-cards">
            <div className="card green">
              <i className="fa-solid fa-book"></i>
              <div className="card-title">Total Courses</div>
              <div className="card-value">8</div>
              <a href="#">View Courses</a>
            </div>
            <div className="card pink">
              <i className="fa-solid fa-user-graduate"></i>
              <div className="card-title">Total Students</div>
              <div className="card-value">6</div>
              <a href="#">View Students</a>
            </div>
          </div>
        </div>

        <div className="analytics">
          <h3>Basic Analytics</h3>
          <div className="analytics-cards">
            <div className="analytics-card">
              <i className="fa-solid fa-user-graduate"></i>
              <div className="analytics-title">Total Students</div>
              <div className="analytics-value">6</div>
            </div>
            <div className="analytics-card">
              <i className="fa-solid fa-book"></i>
              <div className="analytics-title">Students per Course</div>
              <div className="analytics-value">0.75 avg</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
