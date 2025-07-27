import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StudentContext from '../../context/StudentContext';

const EditStudent = () => {
  const { editStudent, getStudents } = useContext(StudentContext);
  const location = useLocation();
  const navigate = useNavigate();

  const selectedStudent = location.state;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    course: '',
  });

  const [loading, setLoading] = useState(false);

  // Load existing student data
  useEffect(() => {
    if (!selectedStudent) {
      alert("No student selected. Redirecting...");
      navigate('/admin-panel');
      return;
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
      [name]: name === 'age' ? value.replace(/\D/, '') : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedStudent?._id) {
      alert("Invalid student ID");
      return;
    }

    try {
      setLoading(true);

      const updatedData = {
        ...formData,
        age: parseInt(formData.age), // ensure number
      };

      await editStudent(selectedStudent._id, updatedData);
      await getStudents(); // Refresh data in StudentTable
      alert("Student updated successfully!");
      navigate('/admin-panel');
    } catch (error) {
      console.error(error);
      alert("Failed to update student.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Discard changes?")) {
      navigate('/admin-panel');
    }
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
              min="1"
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

        <div className="button-container mt-3 d-flex justify-content-end gap-3">
          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Student'}
          </button>
          <button
            type="button"
            className="btn-delete"
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

export default EditStudent;
