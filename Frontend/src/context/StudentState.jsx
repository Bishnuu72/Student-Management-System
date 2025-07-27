import React from 'react';
import StudentContext from './StudentContext';

const StudentState = (props) => {
  const courses = ["python", "java", "javascript", "dot Net"];
  const [course, setCourse] = React.useState(courses);
  const [student, setStudent] = React.useState([]);

  const token = localStorage.getItem("token");

  // Fetch all students
  const allStudent = async () => {
    if (!token) {
      console.error("No auth token found. Please login.");
      setStudent([]);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/students/allstudents", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "std-token": token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch students");
      }

      const data = await response.json();
      setStudent(data);
    } catch (error) {
      console.error("Error fetching students:", error.message);
      setStudent([]);
    }
  };

  // Add new student
  const addStudent = async (studentData) => {
    if (!token) {
      console.error("No token found. Please login.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/students/addstudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "std-token": token,
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add student");
      }

      const data = await response.json();
      console.log("Student added:", data);

      allStudent(); // refresh
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
      const response = await fetch(`http://localhost:5000/students/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "std-token": token,
        },
        body: JSON.stringify(updateData),
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
          "std-token": token,
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

  return (
    <StudentContext.Provider
      value={{
        student,
        course,
        setCourse,
        allStudent,
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
