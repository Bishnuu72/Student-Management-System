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

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.role);
        navigate("/"); // Redirect to home
      } else {
        alert(data.error || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
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
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={credentials.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 input-group">
                <span className="input-group-text bg-light">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
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
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
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
