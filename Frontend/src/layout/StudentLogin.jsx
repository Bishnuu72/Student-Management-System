import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import studentImg from "../assets/student.jpg";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/students/auth/student-login", {
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

      // Save token to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", "student");

      // Navigate to student dashboard
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center min-vh-100">
      <div className="container login-box shadow-lg rounded-4 p-0 overflow-hidden">
        <div className="row g-0">
          <div className="col-md-6 login-image-container d-none d-md-block">
            <img src={studentImg} alt="Login Visual" className="img-fluid h-100 w-100 object-fit-cover" />
          </div>
          <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
            <h3 className="mb-4 text-center fw-bold">Student Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 input-group">
                <span className="input-group-text bg-light">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text bg-light">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <div className="d-grid mt-3">
                <button type="submit" className="btn btn-success fw-bold rounded-pill py-2">
                  LOGIN
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <Link to="/" className="back-home-link">← Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
