import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import userImg from '../../assets/profile.jpg';
import StudentTable from './StudentTable';
import CourseTable from './CourseTable';
import StudentContext from '../../context/StudentContext';

const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

// Add this style block at the top of your component file or move to your main CSS
const smsGlowStyle = `
  .sms-glow {
    font-family: 'Pacifico', 'Caveat', cursive, sans-serif;
    font-size: 2.2rem;
    letter-spacing: 2px;
    color: #fff;
    background: linear-gradient(90deg, #00c3ff, #ffff1c, #ff00cc, #00ffb3);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: smsFlow 3s ease-in-out infinite;
    text-shadow: 0 0 8px #00c3ff, 0 0 16px #ff00cc;
    cursor: pointer;
    transition: text-shadow 0.3s;
    display: inline-block;
  }
  .sms-glow:hover {
    text-shadow: 0 0 16px #fff, 0 0 32px #00c3ff, 0 0 32px #ff00cc;
    filter: brightness(1.2);
  }
  @keyframes smsFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const AdminDashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const navigate = useNavigate();

  const { user, student, course, allStudent, fetchCourses } = useContext(StudentContext);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setDropdownOpen(false);
    navigate('/admin-login');
  };

  return (
    <>
      <style>{smsGlowStyle}</style>
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-logo-glow mb-3 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 100 }}>
            <span className="sms-glow" style={{ display: 'block', textAlign: 'center' }}>SMS</span>
          </div>
          <div className="admin-profile d-flex flex-column align-items-center">
            {/* Removed avatar, only show email */}
            <p className="admin-email" style={{ marginTop: 0 }}>{user?.email || ''}</p>
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
              {user && user.avatar ? (
                <img src={`http://localhost:5000${user.avatar}`} alt="User Avatar" className="avatar-img rounded-circle" style={{ objectFit: 'cover', width: 40, height: 40, cursor: 'pointer' }} onClick={() => setDropdownOpen(!dropdownOpen)} />
              ) : (
                <div className="avatar-img rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, background: '#e0e0e0', fontSize: 18, userSelect: 'none', cursor: 'pointer' }} onClick={() => setDropdownOpen(!dropdownOpen)}>
                  {getInitial(user?.name)}
                </div>
              )}
              {dropdownOpen && (
                <div className="dropdown-menu" ref={dropdownRef}>
                  <Link to="/" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <i className="fa-solid fa-house"></i> Home
                  </Link>
                  <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <i className="fa-solid fa-user"></i> Profile
                  </Link>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
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
    </>
  );
};

export default AdminDashboard;
