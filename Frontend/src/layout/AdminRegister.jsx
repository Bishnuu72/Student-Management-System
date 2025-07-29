import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import teacherImg from "../assets/teacher.jpg";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
      window.Swal.fire({icon:'error',title:'Invalid Name',text:'Name must be at least 3 characters.',confirmButtonColor:'#3085d6'});
      return;
    }
    if (!validatePassword(credentials.password)) {
      window.Swal.fire({icon:'error',title:'Weak Password',text:'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',confirmButtonColor:'#3085d6'});
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/admin-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        window.Swal.fire({icon:'success',title:'Registration Successful',text:'Welcome! Redirecting...',timer:1500,showConfirmButton:false});
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.role);
        setTimeout(()=>navigate("/"), 1500);
      } else {
        window.Swal.fire({icon:'error',title:'Registration Failed',text:data.error || 'Registration failed. Try again.',confirmButtonColor:'#3085d6'});
      }
    } catch (err) {
      window.Swal.fire({icon:'error',title:'Error',text:'Something went wrong. Please try again.',confirmButtonColor:'#3085d6'});
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center min-vh-100">
      <div className="container login-box shadow-lg rounded-4 p-0 overflow-hidden">
        <div className="row g-0">
          {/* Left image */}
          <div className="col-md-6 login-image-container d-none d-md-block">
            <img
              src={teacherImg}
              alt="Register Visual"
              className="img-fluid h-100 w-100 object-fit-cover"
            />
          </div>
          {/* Right form */}
          <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
            <h3 className="mb-4 text-center fw-bold">Admin Register</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 input-group">
                <span className="input-group-text bg-light">
                  <i className="fa-solid fa-user"></i>
                </span>
                <label className="form-label mb-0 ms-2" htmlFor="admin-name">
                  Name <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  id="admin-name"
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={credentials.name}
                  onChange={handleChange}
                  required
                  minLength={3}
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text bg-light">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <label className="form-label mb-0 ms-2" htmlFor="admin-email">
                  Email <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  id="admin-email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text bg-light">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <label className="form-label mb-0 ms-2" htmlFor="admin-password">
                  Password <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  id="admin-password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </div>
              <div className="d-grid mt-3">
                <button type="submit" className="btn btn-primary fw-bold rounded-pill py-2">
                  REGISTER
                </button>
              </div>
            </form>
            {/* Link to login */}
            <div className="text-center mt-4">
              <Link to="/admin-login" className="back-home-link">
                ← Login as Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;