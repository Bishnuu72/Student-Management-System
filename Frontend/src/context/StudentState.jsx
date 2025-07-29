import React, { useEffect, useState } from 'react';
import StudentContext from './StudentContext';

const StudentState = (props) => {
  const [courses, setCourses] = useState([]);         
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch all students
  const allStudent = async () => {
    if (!token) {
      console.error("No auth token found. Please login.");
      setStudents([]);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/students/allstudents", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch students");
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error.message);
      setStudents([]);
    }
  };

  // Fetch all courses
  const fetchCourses = async () => {
    if (!token) {
      console.error("No auth token found. Please login.");
      setCourses([]);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/courses/allcourses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch courses");
      }

      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
      setCourses([]);
    }
  };

  // ✅ Add new student (updated)
  const addStudent = async (studentData) => {
    if (!token) {
      console.error("No token found. Please login.");
      return;
    }

    try {
      const selectedCourse = courses.find(c => c.name === studentData.course);
      if (!selectedCourse) {
        throw new Error("Invalid course selected.");
      }

      const newStudentData = {
        ...studentData,
        course: selectedCourse._id,
      };
      const response = await fetch("http://localhost:5000/students/addstudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(newStudentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add student");
      }

      const data = await response.json();
      console.log("Student added:", data);

      // ✅ Append directly instead of re-fetching
      setStudents(prev => [...prev, data]);
    } catch (error) {
      console.error("Error adding student:", error.message);
    }
  };

  // Edit student
  const editStudent = async (id, updateData) => {
    if (!token) {
      console.error("No token found. Please login.");
      return;
    }
    try {
      const selectedCourse = courses.find(c => c.name === updateData.course);
      const updatedData = {
        ...updateData,
        course: selectedCourse ? selectedCourse._id : updateData.course,
      };

      const response = await fetch(`http://localhost:5000/students/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update student");
      }

      const data = await response.json();
      console.log("Edited student:", data);

      allStudent(); // refresh
    } catch (error) {
      console.error("Error updating student:", error.message);
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    if (!token) {
      console.error("No token found. Please login.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/students/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete student");
      }

      const data = await response.json();
      console.log("Deleted:", data);

      allStudent(); // refresh
    } catch (error) {
      console.error("Error deleting student:", error.message);
    }
  };

  // Load data on mount
  React.useEffect(() => {
    allStudent();
    fetchCourses();
  }, []);

  return (
    <StudentContext.Provider
      value={{
        student: students,
        setStudent: setStudents,
        course: courses,
        setCourse: setCourses,
        allStudent,
        fetchCourses,
        addStudent,
        editStudent,
        deleteStudent,
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentState;
