import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StudentContext from '../../context/StudentContext';

const EditStudent = () => {
  const { editStudent } = useContext(StudentContext);
  const location = useLocation();
  const navigate = useNavigate();

  const selectedStudent = location.state;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    course: '',
  });

  // Load student data into form on component mount
  useEffect(() => {
    if (!selectedStudent) {
      alert("No student selected. Redirecting...");
      return navigate('/');
    }

    setFormData({
      name: selectedStudent.name || '',
      email: selectedStudent.email || '',
      age: selectedStudent.age || '',
      course: selectedStudent.course || '',
    });
  }, [selectedStudent, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedStudent?._id) {
      alert("Invalid student ID");
      return;
    }

    try {
      await editStudent(selectedStudent._id, formData);
      alert("Student updated successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to update student.");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="student-form-container">
      <h2 className="form-title">Edit Student Details</h2>

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
        </div>

        <div className="button-container">
          <button type="submit" className="btn-submit me-3">Update Student</button>
          <button type="button" className="btn-delete" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
