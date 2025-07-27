import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import userImg from '../../assets/profile.jpg';
import StudentTable from './StudentTable';
import CourseTable from './CourseTable';
import StudentContext from '../../context/StudentContext';

const AdminDashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  const { student, course, allStudent, fetchCourses } = useContext(StudentContext);

  useEffect(() => {
    allStudent();      // fetch students on load
    fetchCourses();    // fetch courses on load
  }, []);

  // Dropdown click outside handler
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
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="admin-profile">
          <img src={userImg} alt="User Avatar" className="avatar-img" />
          <p className="admin-email">admin@gmail.com</p>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li className={activeSection === 'dashboard' ? 'active' : ''} onClick={() => setActiveSection('dashboard')}>
              <i className="fa-solid fa-gauge"></i> Dashboard
            </li>
            <li className={activeSection === 'courses' ? 'active' : ''} onClick={() => setActiveSection('courses')}>
              <i className="fa-solid fa-book"></i> Courses
            </li>
            <li className={activeSection === 'students' ? 'active' : ''} onClick={() => setActiveSection('students')}>
              <i className="fa-solid fa-user-graduate"></i> Students
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <div className="top-headbar">
          <div className="welcome-message">Welcome to the Admin Dashboard!</div>
          <div className="admin-profile top-avatar" ref={avatarRef}>
            <img src={userImg} alt="User Avatar" className="avatar-img" onClick={() => setDropdownOpen(!dropdownOpen)} />
            {dropdownOpen && (
              <div className="dropdown-menu" ref={dropdownRef}>
                <Link to="/" className="dropdown-item">
                  <i className="fa-solid fa-house"></i> Home
                </Link>
                <Link to="/profile" className="dropdown-item">
                  <i className="fa-solid fa-user"></i> Profile
                </Link>
                <button className="dropdown-item logout-btn" onClick={() => console.log("Logout clicked")}>
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 🔍 Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search students by name, email or course"
            className="form-control search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        {/* Dashboard Overview */}
        {activeSection === 'dashboard' && (
          <>
            <div className="report-summary">
              <div className="report-header">
                <h3>Report Summary</h3>
                <span className="refresh-icon">
                  <i className="fa-solid fa-rotate"></i> Updated Report
                </span>
              </div>
              <div className="summary-cards">
                <div className="card green">
                  <i className="fa-solid fa-book"></i>
                  <div className="card-title">Total Courses</div>
                  <div className="card-value">{course.length}</div>
                  <button className="view-link-btn" onClick={() => setActiveSection('courses')}>
                    View Courses
                  </button>
                </div>
                <div className="card pink">
                  <i className="fa-solid fa-user-graduate"></i>
                  <div className="card-title">Total Students</div>
                  <div className="card-value">{student.length}</div>
                  <button className="view-link-btn" onClick={() => setActiveSection('students')}>
                    View Students
                  </button>
                </div>
              </div>
            </div>

            {/* Basic Analytics */}
            <div className="analytics">
              <h3>Basic Analytics</h3>
              <div className="analytics-cards">
                <div className="analytics-card">
                  <i className="fa-solid fa-user-graduate"></i>
                  <div className="analytics-title">Total Students</div>
                  <div className="analytics-value">{student.length}</div>
                </div>
                <div className="analytics-card">
                  <i className="fa-solid fa-book"></i>
                  <div className="analytics-title">Students per Course</div>
                  <div className="analytics-value">
                    {course.length > 0 ? (student.length / course.length).toFixed(2) : "0.00"} avg
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Course Table with Search */}
        {activeSection === 'courses' && (
          <div className="section-content">
            <CourseTable searchQuery={searchQuery} />
          </div>
        )}

        {/* Student Table with Search */}
        {activeSection === 'students' && (
          <div className="section-content">
            <StudentTable searchQuery={searchQuery} />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
