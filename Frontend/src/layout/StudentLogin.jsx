import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import studentImg from "../assets/student.jpg";

const StudentLogin = () => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/students/auth/student-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", "student");

      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Redirecting to your home page...",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div
        className="container login-box shadow-lg rounded-4 p-0 overflow-hidden"
        style={{ maxWidth: "1295px", marginTop: "50px" }}
      >
        <div className="row g-0">
          {/* Left Side Image */}
          <div className="col-md-6 d-none d-md-block">
            <img
              src={studentImg}
              alt="Student Login Visual"
              className="img-fluid h-100 w-100 object-fit-cover"
            />
          </div>

          {/* Right Side Form */}
          <div className="col-md-6 p-5 d-flex flex-column justify-content-center bg-white">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-success" style={{ letterSpacing: 1 }}>Student Login</h2>
              <div className="slogan-divider mb-2 mx-auto" style={{ height: 3, width: 80, backgroundColor: '#28a745', borderRadius: 4 }}></div>
              <p className="text-muted small">Access your student dashboard</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold" htmlFor="student-email">
                  <i className="fa-solid fa-envelope me-2 text-success"></i>Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  id="student-email"
                  className="form-control rounded-3 shadow-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold" htmlFor="student-password">
                  <i className="fa-solid fa-lock me-2 text-success"></i>Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  id="student-password"
                  className="form-control rounded-3 shadow-sm"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-success fw-bold rounded-pill py-2"
                >
                  <i className="fa-solid fa-right-to-bracket me-2"></i>LOGIN
                </button>
              </div>
            </form>

            <div className="text-center mt-4">
              <Link to="/" className="text-decoration-none text-success fw-medium">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
