import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import teacherImg from "../assets/teacher.jpg";

const AdminRegister = () => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: name === 'email' ? value.toLowerCase() : value,
    }));
  };

  function validatePassword(password) {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  }

  function validateName(name) {
    return name.trim().length >= 3;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateName(credentials.name)) {
      window.Swal.fire({
        icon: "error",
        title: "Invalid Name",
        text: "Name must be at least 3 characters.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    if (!validatePassword(credentials.password)) {
      window.Swal.fire({
        icon: "error",
        title: "Weak Password",
        text:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/admin-register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        window.Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Welcome! Redirecting...",
          timer: 1500,
          showConfirmButton: false,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.role);
        setTimeout(() => navigate("/"), 1500);
      } else {
        window.Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.error || "Registration failed. Try again.",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (err) {
      window.Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="container login-box shadow-lg rounded-4 p-0 overflow-hidden" style={{ maxWidth: '1295px', marginTop: '120px'}}>
        <div className="row g-0">
          {/* Left Side Image */}
          <div className="col-md-6 d-none d-md-block">
            <img
              src={teacherImg}
              alt="Admin Registration Visual"
              className="img-fluid h-100 w-100 object-fit-cover"
            />
          </div>

          {/* Right Side Form */}
          <div className="col-md-6 p-5 d-flex flex-column justify-content-center bg-white">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-primary" style={{ letterSpacing: 1 }}>Admin Register</h2>
              <div className="slogan-divider mb-2 mx-auto" style={{ height: 3, width: 80, backgroundColor: '#00b3ff', borderRadius: 4 }}></div>
              <p className="text-muted small">Join the Admin Portal - Manage with Power!</p>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label fw-semibold" htmlFor="admin-name">
                  <i className="fa-solid fa-user me-2 text-primary"></i>Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="admin-name"
                  name="name"
                  value={credentials.name}
                  onChange={handleChange}
                  className="form-control rounded-3 shadow-sm"
                  placeholder="Enter your name"
                  required
                  minLength={3}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" htmlFor="admin-email">
                  <i className="fa-solid fa-envelope me-2 text-primary"></i>Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  id="admin-email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="form-control rounded-3 shadow-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold" htmlFor="admin-password">
                  <i className="fa-solid fa-lock me-2 text-primary"></i>Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  id="admin-password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="form-control rounded-3 shadow-sm"
                  placeholder="Enter your password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary rounded-pill fw-bold py-2">
                  <i className="fa-solid fa-user-plus me-2"></i>REGISTER
                </button>
              </div>
            </form>

            <div className="text-center mt-4">
              <Link to="/admin-login" className="text-decoration-none text-primary fw-medium">
                ← Already Registered? Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
