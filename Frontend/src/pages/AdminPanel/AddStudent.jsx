import React, { useState } from 'react';
import './StudentForm.css'; // Import external CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentForm = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    course: '',
  });
  const [editIndex, setEditIndex] = useState(null);

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
    setFormData({ name: '', email: '', age: '', course: '' });
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

  return (
    <div className="container student-form-container mt-5 mb-5">
      <h2 className="text-center mb-4">Student Enrollment Form</h2>

      <form className="shadow p-4 rounded bg-white" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Course Enrolled</label>
            <input
              type="text"
              className="form-control"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-primary">
            {editIndex !== null ? 'Update Student' : 'Add Student'}
          </button>
        </div>
      </form>

      <div className="mt-5">
        <h4 className="text-center mb-3">Enrolled Students</h4>
        {students.length === 0 ? (
          <p className="text-center text-muted">No students enrolled yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>{student.course}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
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

export default StudentForm;
