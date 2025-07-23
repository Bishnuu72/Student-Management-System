import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Required for redirection

const AddStudent = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    course: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...students];
      updated[editIndex] = formData;
      setStudents(updated);
      setEditIndex(null);
    } else {
      setStudents([...students, formData]);
    }
    setFormData({ name: '', email: '', password: '', age: '', course: '' });
  };

  const handleEdit = (index) => {
    setFormData(students[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
    setEditIndex(null);
  };

  const handleCancel = () => {
    navigate('/admin-panel'); // Replace with your student table route
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
            {editIndex !== null ? 'Update Student' : 'Add Student'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>

      <div className="student-table">
        <h4 className="text-center">Enrolled Students</h4>
        {students.length === 0 ? (
          <p className="text-center text-muted">No students enrolled yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-head">
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Course</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.course}</td>
                    <td>{student.email}</td>
                    <td>{student.password}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStudent;
