import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudentTable from './StudentTable';
import CourseTable from './CourseTable';
import StudentContext from '../../context/StudentContext';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '?');

const AdminDashboard = () => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const navigate = useNavigate();

  const { user, student, course, allStudent, fetchCourses } = useContext(StudentContext);

  useEffect(() => {
    allStudent();
    fetchCourses();
  }, []);

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

  const courseLabels = course.map((c) => c.title || c.name || `Course ${c._id?.slice(0, 4) || ''}`);
  const studentCountPerCourse = course.map((c) =>
    student.filter((s) => {
      const courseId = typeof s.course === 'object' ? s.course._id : s.course;
      return courseId === c._id;
    }).length
  );


  const allZero = studentCountPerCourse.every((count) => count === 0);

  const pieColors = [
    '#00b3ff',
    '#00ff94',
    '#ff6347',
    '#ffcc00',
    '#9933ff',
    '#33ffad',
    '#ff3399',
    '#3399ff',
    '#ff6666',
    '#33cc33',
  ];

  const data = {
    labels: allZero ? ['No Data Available'] : courseLabels,
    datasets: [
      {
        label: 'Total Students',
        data: allZero ? [1] : studentCountPerCourse,
        backgroundColor: allZero ? ['#e0e0e0'] : pieColors.slice(0, course.length),
        borderColor: '#121212',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw;
            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return allZero
              ? 'No student data to display'
              : `${label}: ${value} students (${percentage}%)`;
          },
        },
        backgroundColor: '#000',
        titleColor: '#00b3ff',
        bodyColor: '#fff',
      },
    },
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div
          className="sidebar-logo-glow mb-3 d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: 100 }}
        >
          <span className="sms-glow" style={{ display: 'block', textAlign: 'center' }}>
            SMS
          </span>
        </div>
        <div className="admin-profile d-flex flex-column align-items-center">
          <p className="admin-email" style={{ marginTop: 0 }}>
            {user?.email || ''}
          </p>
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
              <img
                src={`${API_BASE_URL}${user.avatar}`}
                alt="User Avatar"
                className="avatar-img rounded-circle"
                style={{ objectFit: 'cover', width: 40, height: 40, cursor: 'pointer' }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
            ) : (
              <div
                className="avatar-img rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40, background: '#e0e0e0', fontSize: 18, userSelect: 'none', cursor: 'pointer' }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
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

        {/* Slogan */}
        <div className="slogan-wrapper overflow-hidden w-100 mb-3">
          <div className="scrolling-title">
            Student Management System - Organize, Track, and Empower Students Seamlessly!
          </div>
          <div className="slogan-divider"></div>
        </div>

        {/* Search */}
        {(activeSection === 'students' || activeSection === 'courses') && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search students by name or course..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        )}

        {/* Dashboard View */}
        {activeSection === 'dashboard' && (
          <>
            <div className="report-summary">
              <div className="report-header">
                <h3>Basic Analytics</h3>
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

            {/* Pie Chart Analytics */}
            <div className="analytics">
              <h3 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '1.5rem', color: '#000' }}>
                Number of Students Enrolled per Course
              </h3>
              <div
                className="d-flex justify-content-center align-items-center flex-wrap"
                style={{ gap: '2rem', padding: '1rem' }}
              >
                <div style={{ width: '360px', height: '360px' }}>
                  <Pie data={data} options={options} />
                </div>
                <div>
                  <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    {(allZero ? ['No Data Available'] : courseLabels).map((label, index) => (
                      <li key={index} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            width: 16,
                            height: 16,
                            marginRight: 8,
                            backgroundColor: allZero ? '#e0e0e0' : pieColors[index % pieColors.length],
                            borderRadius: '50%',
                          }}
                        ></span>
                        <span style={{ fontWeight: 'bold', color: '#333' }}>{label}</span>
                        {!allZero && (
                          <span style={{ marginLeft: 'auto', color: '#555' }}>
                            ({studentCountPerCourse[index]} students)
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Courses Table */}
        {activeSection === 'courses' && (
          <div className="section-content">
            <CourseTable searchQuery={searchQuery} />
          </div>
        )}

        {/* Students Table */}
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
