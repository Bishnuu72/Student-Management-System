import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentContext from '../../context/StudentContext';

const AddStudent = () => {
  const navigate = useNavigate();
  const { addStudent, course } = useContext(StudentContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    course: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'age'
          ? value.replace(/\D/, '')
          : name === 'email'
          ? value.toLowerCase()
          : value,
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

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateName(formData.name)) {
      window.Swal.fire({
        icon: 'error',
        title: 'Invalid Name',
        text: 'Name must be at least 3 characters.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }
    if (!validatePassword(formData.password)) {
      window.Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        text:
          'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }
    const studentPayload = {
      ...formData,
      age: parseInt(formData.age),
    };
    try {
      setLoading(true);
      await addStudent(studentPayload);
      window.Swal.fire({
        icon: 'success',
        title: 'Student Added',
        text: 'Student has been added successfully.',
        timer: 1500,
        showConfirmButton: false,
      });
      setTimeout(() => {
        setFormData({ name: '', email: '', password: '', age: '', course: '' });
        navigate('/admin-panel');
      }, 1500);
    } catch (error) {
      window.Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add student. Try again.',
        confirmButtonColor: '#3085d6',
      });
    } finally {
      setLoading(false);
    }
  };

  // Cancel and go back with SweetAlert confirmation
  const handleCancel = async () => {
    const result = await window.Swal.fire({
      title: "Are you sure you want to cancel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      navigate('/admin-panel');
    }
  };

  return (
    <div className="student-form-container">
      <h2 className="form-title">Student Enrollment Form</h2>

      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="custom-label">
              Full Name <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              className="custom-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student's full name"
              required
              minLength={3}
            />
          </div>
          <div className="form-group">
            <label className="custom-label">
              Age <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="number"
              className="custom-input"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              required
              min="1"
            />
          </div>
          <div className="form-group">
            <label className="custom-label">
              Course <span style={{ color: 'red' }}>*</span>
            </label>
            <select
              className="custom-input"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a Course --</option>
              {course.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h5 className="login-title">Login Credentials</h5>

        <div className="form-row">
          <div className="form-group">
            <label className="custom-label">
              Email <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="email"
              className="custom-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="custom-label">
              Password <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="password"
              className="custom-input"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
        </div>
        <div className="button-container d-flex justify-content-end gap-3 mt-3">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Student'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
