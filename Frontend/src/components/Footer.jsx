import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ darkMode }) => {
  return (
    <>
      <footer className={`footer-section ${darkMode ? "bg-dark text-white" : "bg-light text-dark"} py-5`}>
        <div className="container">
          <div className="row text-center text-md-start">
            {/* Left Section */}
            <div className="col-md-5 mb-4 mb-md-0">
              <h5 className="footer-brand">Student Management System</h5>
              <p className="footer-description">
                StudentMS is a modern web platform designed to simplify student management for schools, colleges, and universities. Manage records, courses, and performance with ease.
              </p>
              <div className="social-icons mt-3">
                <i className="fa-brands fa-facebook footer-icon"></i>
                <i className="fa-brands fa-linkedin footer-icon"></i>
                <i className="fa-brands fa-twitter footer-icon"></i>
                <i className="fa-brands fa-github footer-icon"></i>
              </div>
            </div>
            <div className="col-md-1"></div>

            {/* Middle Section */}
            <div className="col-md-2 mb-4 mb-md-0">
              <h6 className="footer-heading">Quick Links</h6>
              <ul className="list-unstyled">
                <li><Link to="/" className="footer-link">Home</Link></li>
                <li><Link to="/about" className="footer-link">About</Link></li>
                <li><Link to="/contact" className="footer-link">Contact</Link></li>
                <li><Link to="/admin-login" className="footer-link">Admin Login</Link></li>
                <li><Link to="/student-login" className="footer-link">Student Login</Link></li>
              </ul>
            </div>

            {/* Right Section */}
            <div className="col-md-4">
              <h6 className="footer-heading">Reach Us</h6>
              <p>Mindrisers Institute<br />New Plaza, Kathmandu, Nepal</p>
              <p><a href="mailto:info@studentms.com" className="footer-link">info@studentms.com</a></p>
              <p>+977-9812345670</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright Section */}
      <div className={`${darkMode ? "bg-dark text-white" : "bg-light text-dark"} text-center py-3`}>
        <small>Copyright © 2025. All rights reserved. Designed by Bishnu Kumar Yadav</small>
      </div>
    </>
  );
};

export default Footer;
