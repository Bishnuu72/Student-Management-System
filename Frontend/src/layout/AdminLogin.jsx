import React from "react";
import { Link } from "react-router-dom";
import teacherImg from "../assets/teacher.jpg";

const AdminLogin = () => {
  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center min-vh-100">
      <div className="container login-box shadow-lg rounded-4 p-0 overflow-hidden">
        <div className="row g-0">
          {/* Left image */}
          <div className="col-md-6 login-image-container d-none d-md-block">
            <img
              src={teacherImg}
              alt="Login Visual"
              className="img-fluid h-100 w-100 object-fit-cover"
            />
          </div>

          {/* Right form */}
          <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
            <h3 className="mb-4 text-center fw-bold">Admin Login</h3>

            <form>
              <div className="mb-3 input-group">
                <span className="input-group-text bg-light">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input type="email" className="form-control" placeholder="Email" />
              </div>

              <div className="mb-3 input-group">
                <span className="input-group-text bg-light">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input type="password" className="form-control" placeholder="Password" />
              </div>

              <div className="d-grid mt-3">
                <button type="submit" className="btn btn-success fw-bold rounded-pill py-2">
                  LOGIN
                </button>
              </div>

              <div className="mt-3 text-center">
                <a href="/" className="text-muted small">
                  Forgot Username / Password?
                </a>
              </div>
            </form>

            {/* Back to Home */}
            <div className="text-center mt-4">
              <Link to="/" className="back-home-link">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
