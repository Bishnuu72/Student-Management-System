import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StudentContext from '../../context/StudentContext';

const EditStudent = () => {
  const { editStudent, allStudent, course } = useContext(StudentContext);
  const location = useLocation();
  const navigate = useNavigate();

  const selectedStudent = location.state;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    course: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedStudent) {
      window.Swal.fire({icon:'warning',title:'No Student Selected',text:'No student selected. Redirecting...',confirmButtonColor:'#3085d6'});
      navigate('/admin-panel');
      return;
    }

    setFormData({
      name: selectedStudent.name || '',
      email: selectedStudent.email || '',
      age: selectedStudent.age?.toString() || '',
      course: selectedStudent.course?.name || '',
      password: '', // 👈 Leave empty initially
    });
  }, [selectedStudent, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? value.replace(/\D/, '') : value,
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
    if (!validateName(formData.name)) {
      window.Swal.fire({icon:'error',title:'Invalid Name',text:'Name must be at least 3 characters.',confirmButtonColor:'#3085d6'});
      return;
    }
    if (formData.password && !validatePassword(formData.password)) {
      window.Swal.fire({icon:'error',title:'Weak Password',text:'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',confirmButtonColor:'#3085d6'});
      return;
    }
    if (!selectedStudent?._id) {
      window.Swal.fire({icon:'error',title:'Error',text:'Invalid student ID',confirmButtonColor:'#3085d6'});
      return;
    }
    try {
      setLoading(true);
      const updatedData = {
        ...formData,
        age: parseInt(formData.age),
        course: formData.course,
      };
      if (!formData.password.trim()) {
        delete updatedData.password;
      }
      await editStudent(selectedStudent._id, updatedData);
      await allStudent();
      window.Swal.fire({icon:'success',title:'Student Updated',text:'Student updated successfully!',timer:1500,showConfirmButton:false});
      setTimeout(()=>navigate('/admin-panel'), 1500);
    } catch (error) {
      window.Swal.fire({icon:'error',title:'Error',text:'Failed to update student.',confirmButtonColor:'#3085d6'});
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
            <label className="custom-label">Full Name <span style={{ color: 'red' }}>*</span></label>
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
            <label className="custom-label">Age <span style={{ color: 'red' }}>*</span></label>
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
            <label className="custom-label">Course <span style={{ color: 'red' }}>*</span></label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="custom-input"
              required
            >
              <option value="">-- Select Course --</option>
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
            <label className="custom-label">Email <span style={{ color: 'red' }}>*</span></label>
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
            <label className="custom-label">Password <span style={{ color: 'red' }}>*</span></label>
            <input
              type="password"
              className="custom-input"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              minLength={8}
              autoComplete="new-password"
            />
            <small className="text-muted">Leave blank to keep current password.</small>
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