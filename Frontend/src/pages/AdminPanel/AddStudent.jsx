import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentContext from '../../context/StudentContext';

const AddStudent = () => {
  const navigate = useNavigate();
  const { addStudent } = useContext(StudentContext);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    course: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent(formData);
    setFormData({ name: '', email: '', password: '', age: '', course: '' });
    navigate('/admin-panel'); // Adjust route to match your student list view
  };

  const handleCancel = () => {
    navigate('/admin-panel');
  };

  return (
    <div className="student-form-container">
      <h2 className="form-title">Student Enrollment Form</h2>

      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="custom-label">Full Name</label>
            <input
              type="text"
              className="custom-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student's full name"
              required
            />
          </div>
          <div className="form-group">
            <label className="custom-label">Age</label>
            <input
              type="number"
              className="custom-input"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              required
            />
          </div>
          <div className="form-group">
            <label className="custom-label">Course</label>
            <input
              type="text"
              className="custom-input"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Course name"
              required
            />
          </div>
        </div>

        <h5 className="login-title">Login Credentials</h5>

        <div className="form-row">
          <div className="form-group">
            <label className="custom-label">Email</label>
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
            <label className="custom-label">Password</label>
            <input
              type="password"
              className="custom-input"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
        </div>

        <div className="button-container d-flex justify-content-end gap-3 mt-3">
          <button type="submit" className="btn-submit">
            Add Student
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
