import React, { useContext } from 'react';
import StudentContext from '../../context/StudentContext';

const CourseTable = () => {
  const context = useContext(StudentContext);
  const { student, course } = context;

  // Count number of students per course
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

  const courseList = getCourseCounts();

  const handleAddCourse = () => {
    const newCourse = prompt("Enter the name of the new course:");
    if (newCourse && newCourse.trim() !== "") {
      if (!course.includes(newCourse.trim())) {
        context.setCourse([...course, newCourse.trim()]);
        alert(`Course "${newCourse.trim()}" added successfully.`);
      } else {
        alert("Course already exists.");
      }
    }
  };

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
              </tr>
            </thead>
            <tbody>
              {courseList.map(([courseName, count], index) => (
                <tr key={courseName}>
                  <td>{index + 1}</td>
                  <td>{courseName}</td>
                  <td>{count}</td>
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
