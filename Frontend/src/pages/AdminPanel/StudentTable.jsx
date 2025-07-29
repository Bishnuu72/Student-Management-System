import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentContext from '../../context/StudentContext';

const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

const StudentTable = ({ searchQuery }) => {
  const navigate = useNavigate();
  const { student, allStudent, deleteStudent } = useContext(StudentContext);

  useEffect(() => {
    if (student.length === 0) {
      allStudent();
    }
  }, []);

  useEffect(() => {
    console.log("Students data updated:", student);
  }, [student]);

  const handleAddStudent = () => {
    navigate("/add-student");
  };

  const handleEditStudent = (std) => {
    navigate("/edit-student", { state: std });
  };

  const handleDeleteStudent = async (id) => {
    const result = await window.Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      deleteStudent(id);
      window.Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Student has been deleted.",
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  const filteredStudents = student.filter((std) => {
    const query = searchQuery?.toLowerCase() || "";
    const name = std.name?.toLowerCase() || "";
    const course = std.course?.name?.toLowerCase() || "";
    return name.includes(query) || course.includes(query);
  });

  return (
    <div className="container student-table-container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="section-title">Students List</h3>
        <button className="btn btn-success" onClick={handleAddStudent}>
          <i className="fas fa-plus me-2"></i> Add Student
        </button>
      </div>

      {student.length === 0 ? (
        <p className="text-center text-muted">No students available.</p>
      ) : filteredStudents.length === 0 ? (
        <p className="text-center text-muted">No matching students found.</p>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-primary">
              <tr>
                <th>S.N</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((std, index) => (
                <tr key={std._id}>
                  <td>{index + 1}</td>
                  <td className="text-center">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: '100%' }}
                    >
                      {std.avatar ? (
                        <img
                          src={`http://localhost:5000${std.avatar}`}
                          alt={std.name || "Student"}
                          className="rounded-circle"
                          width="40"
                          height="40"
                          style={{
                            objectFit: 'cover',
                            background: '#f8f9fa',
                          }}
                        />
                      ) : (
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: 40,
                            height: 40,
                            background: '#e0e0e0',
                            fontSize: 18,
                            userSelect: 'none',
                            color: '#555',
                          }}
                        >
                          {getInitial(std.name)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>{std.name || "N/A"}</td>
                  <td>{std.email || "N/A"}</td>
                  <td>{std.age ?? "N/A"}</td>
                  <td>{std.course?.name || "N/A"}</td>
                  <td>
                    <i
                      className="fas fa-edit text-primary me-3"
                      title="Edit"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleEditStudent(std)}
                    ></i>
                    <i
                      className="fas fa-trash-alt text-danger"
                      title="Delete"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDeleteStudent(std._id)}
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
