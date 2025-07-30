import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import teacherImg from "../assets/teacher.jpg";

const AdminLogin = () => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.role);

        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome, Admin!",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/admin-panel");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.error || "Invalid email or password.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Try again later.",
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
          {/* Left image */}
          <div className="col-md-6 d-none d-md-block">
            <img
              src={teacherImg}
              alt="Login Visual"
              className="img-fluid h-100 w-100 object-fit-cover"
            />
          </div>

          {/* Right form */}
          <div className="col-md-6 p-5 d-flex flex-column justify-content-center bg-white">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-success" style={{ letterSpacing: 1 }}>Admin Login</h2>
              <div className="slogan-divider mb-2 mx-auto" style={{ height: 3, width: 80, backgroundColor: '#28a745', borderRadius: 4 }}></div>
              <p className="text-muted small">Access the Admin Portal - Secure & Manage!</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold" htmlFor="admin-email">
                  <i className="fa-solid fa-envelope me-2 text-success"></i>Email <span className="text-danger">*</span>
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
                  <i className="fa-solid fa-lock me-2 text-success"></i>Password <span className="text-danger">*</span>
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
              <Link to="/admin-register" className="text-decoration-none text-success fw-medium">
                ← Register New Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
