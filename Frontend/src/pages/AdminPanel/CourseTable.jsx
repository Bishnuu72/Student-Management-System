import React, { useContext } from 'react';
import StudentContext from '../../context/StudentContext';

const CourseTable = () => {
  const { student, course, setCourse } = useContext(StudentContext);

  // Get student counts for each course
  const getCourseCounts = () => {
    const counts = {};
    course.forEach((c) => {
      counts[c] = 0;
    });
    student.forEach((s) => {
      if (counts[s.course] !== undefined) {
        counts[s.course]++;
      }
    });
    return Object.entries(counts);
  };

  const handleAddCourse = () => {
    const newCourse = prompt("Enter the name of the new course:")?.trim();
    if (newCourse) {
      if (!course.includes(newCourse)) {
        setCourse([...course, newCourse]);
        alert(`Course "${newCourse}" added successfully.`);
      } else {
        alert("Course already exists.");
      }
    }
  };

  const handleDeleteCourse = (courseName) => {
    const studentCount = student.filter((s) => s.course === courseName).length;
    if (studentCount > 0) {
      alert("Cannot delete course. Students are enrolled in it.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete "${courseName}"?`)) {
      setCourse(course.filter((c) => c !== courseName));
    }
  };

  const courseList = getCourseCounts();

  return (
    <div className="student-form-container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="form-title mb-0">Course-wise Enrollment Summary</h2>
        <button className="btn btn-primary" onClick={handleAddCourse}>
          + Add Course
        </button>
      </div>

      {courseList.length === 0 ? (
        <p className="text-center text-muted">No courses found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-head">
              <tr>
                <th>S.N</th>
                <th>Course Name</th>
                <th>Total Students</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courseList.map(([courseName, count], index) => (
                <tr key={courseName}>
                  <td>{index + 1}</td>
                  <td>{courseName}</td>
                  <td>{count}</td>
                  <td>
                    <i
                      className="fas fa-trash-alt text-danger"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDeleteCourse(courseName)}
                      title="Delete Course"
                    />
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

export default CourseTable;
