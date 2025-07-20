import React from 'react';
import { useContext } from 'react';
import StudentContext from '../../context/StudentContext';
import stdImg from "../../assets/profile.jpg"
import { useNavigate } from 'react-router-dom';

const StudentTable = () => {
  const navigate = useNavigate();
  const context = useContext(StudentContext);
  const {student} = context;
  console.log("Students from context:",student);

  const handleAddStudent = () => {
    navigate("/add-student");
  };

  return (
    <div className="container student-table-container mt-5 mb-5">
      <h3 className="text-center mb-4">Students List</h3>

      {student.length === 0 ? (
        <p className="text-center text-muted">No students available.</p>
      ) : (
        <div className="table-responsive">
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-success" onClick={handleAddStudent}>
              <i className="fas fa-plus me-2"></i> Add Student
            </button>
          </div>
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-primary">
              <tr>
                <th>S.N</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Course Enrolled</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {student.map((std, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>
                    <img
                      src={stdImg}
                      alt={std.name}
                      className="student-img"
                    />
                  </td>
                  <td>{std.name}</td>
                  <td>{std.email}</td>
                  <td>{std.age}</td>
                  <td>{std.course}</td>
                  <td>
                    {/* Edit Icon */}
                    <i
                      className="fas fa-edit text-primary me-3"
                      title="Edit"
                      style={{ cursor: 'pointer' }}
                      onClick={() => alert(`Edit ${std.name}`)}
                    ></i>

                    {/* Delete Icon */}
                    <i
                      className="fas fa-trash-alt text-danger"
                      title="Delete"
                      style={{ cursor: 'pointer' }}
                      onClick={() => alert(`Delete ${std.name}`)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
