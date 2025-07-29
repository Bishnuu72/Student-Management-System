import React, { useContext, useState } from 'react';
import StudentContext from '../../context/StudentContext';

const CourseTable = ({ searchQuery }) => {
  const { student, course, setCourse, fetchCourses } = useContext(StudentContext);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  // Defensive: Ensure course is always an array
  const safeCourses = Array.isArray(course) ? course.filter(c => c && c._id) : [];

  // Get student counts for each course (by matching ObjectId)
  const getCourseCounts = () => {
    const counts = {};
    safeCourses.forEach((c) => {
      counts[c._id] = 0;
    });
    student.forEach((s) => {
      const courseId = typeof s.course === "object" ? s.course?._id : s.course;
      if (courseId && counts[courseId] !== undefined) {
        counts[courseId]++;
      }
    });
    return safeCourses.map((c) => [c, counts[c._id] || 0]);
  };

  // Add course with backend API call
  const handleAddCourse = async () => {
    const newCourseName = prompt("Enter the name of the new course:")?.trim();
    if (!newCourseName) return;

    const exists = course.some(c => c.name.toLowerCase() === newCourseName.toLowerCase());
    if (exists) {
      alert("Course already exists.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/courses/addcourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ name: newCourseName }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to add course");
      }

      await fetchCourses();
      alert(`Course "${newCourseName}" added successfully.`);
    } catch (error) {
      alert("Error adding course: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete course with backend API call
  const handleDeleteCourse = async (courseObj) => {
    const studentCount = student.filter((s) => s.course === courseObj._id).length;
    if (studentCount > 0) {
      alert("Cannot delete course. Students are enrolled in it.");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${courseObj.name}"?`)) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/courses/deletecourses/${courseObj._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to delete course");
      }

      await fetchCourses();
      alert(`Course "${courseObj.name}" deleted successfully.`);
    } catch (error) {
      alert("Error deleting course: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const courseList = getCourseCounts();

  // Filtered course list using searchQuery
  const filteredCourseList = courseList.filter(([courseObj]) => {
    const query = searchQuery?.toLowerCase() || "";
    return courseObj.name.toLowerCase().includes(query);
  });

  return (
    <div className="student-form-container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="form-title mb-0">Course-wise Enrollment Summary</h2>
        <button
          className="btn btn-primary"
          onClick={handleAddCourse}
          disabled={loading}
        >
          + Add Course
        </button>
      </div>

      {courseList.length === 0 ? (
        <p className="text-center text-muted">No courses found.</p>
      ) : filteredCourseList.length === 0 ? (
        <p className="text-center text-muted">No matching courses found.</p>
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
              {filteredCourseList.map(([courseObj, count], index) => (
                <tr key={courseObj._id}>
                  <td>{index + 1}</td>
                  <td>{courseObj.name}</td>
                  <td>{count}</td>
                  <td>
                    <i
                      className="fas fa-trash-alt text-danger"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDeleteCourse(courseObj)}
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