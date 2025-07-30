import React, { useContext, useState } from 'react';
import StudentContext from '../../context/StudentContext';

const CourseTable = ({ searchQuery }) => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const { student, course, setCourse, fetchCourses } = useContext(StudentContext);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const safeCourses = Array.isArray(course) ? course.filter(c => c && c._id) : [];

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

  const handleAddCourse = async () => {
    const { value: newCourseName } = await window.Swal.fire({
      title: 'Enter the name of the new course:',
      input: 'text',
      inputPlaceholder: 'Course name',
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value || !value.trim()) {
          return 'Course name cannot be empty!';
        }
      }
    });

    if (!newCourseName) return;

    const trimmedName = newCourseName.trim();
    const exists = course.some(c => c.name.toLowerCase() === trimmedName.toLowerCase());
    if (exists) {
      window.Swal.fire({
        icon: 'error',
        title: 'Course already exists.',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/courses/addcourse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ name: trimmedName }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to add course");
      }

      await fetchCourses();
      window.Swal.fire({
        icon: 'success',
        title: `Course "${trimmedName}" added successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      window.Swal.fire({
        icon: 'error',
        title: 'Error adding course',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseObj) => {
    const studentCount = student.filter((s) => {
      const courseId = typeof s.course === "object" ? s.course?._id : s.course;
      return courseId === courseObj._id;
    }).length;

    if (studentCount > 0) {
      window.Swal.fire({
        icon: 'error',
        title: 'Cannot delete course',
        text: 'Students are enrolled in it.',
      });
      return;
    }

    const result = await window.Swal.fire({
      title: `Are you sure you want to delete "${courseObj.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      dangerMode: true,
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/courses/deletecourses/${courseObj._id}`, {
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
      window.Swal.fire({
        icon: 'success',
        title: `Course "${courseObj.name}" deleted successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      window.Swal.fire({
        icon: 'error',
        title: 'Error deleting course',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const courseList = getCourseCounts();

  const filteredCourseList = courseList.filter(([courseObj]) => {
    const query = searchQuery?.toLowerCase() || "";
    return courseObj.name.toLowerCase().includes(query);
  });

  return (
    <div className="container mt-5 mb-5 course-table-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="section-title">Course List</h3>
        <button className="btn btn-success" onClick={handleAddCourse} disabled={loading}>
          <i className="fas fa-plus me-2"></i> Add Course
        </button>
      </div>

      {courseList.length === 0 ? (
        <p className="text-center text-muted">No courses found.</p>
      ) : filteredCourseList.length === 0 ? (
        <p className="text-center text-muted">No matching courses found.</p>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-primary">
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
