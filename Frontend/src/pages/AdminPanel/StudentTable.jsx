import React from 'react';
import { useContext } from 'react';
import StudentContext from '../../context/StudentContext';

const StudentTable = () => {
  const context = useContext(StudentContext);
  const {student} = context;
  console.log("Students from context:",student);
  return (
    <div className="container student-table-container mt-5 mb-5">
      <h3 className="text-center mb-4">Student List</h3>

      {student.length === 0 ? (
        <p className="text-center text-muted">No students available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-primary">
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Course Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {student.map((std, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={std.image}
                      alt={std.name}
                      className="student-img"
                    />
                  </td>
                  <td>{std.name}</td>
                  <td>{std.email}</td>
                  <td>{std.age}</td>
                  <td>{std.course}</td>
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
