import React from "react";

const About = () => {
  return (
    <div className="container mt-5 mb-5 p-4 bg-light rounded shadow">
      <h2 className="text-center text-primary mb-4">About Student Management System</h2>

      <p className="lead">
        The <strong>Student Management System</strong> is a web-based platform designed to simplify and streamline the process of managing student records within an educational institution. This system allows administrators to add, view, update, and delete student information efficiently, all from a central interface.
      </p>

      <h4 className="mt-4 text-success">Key Features:</h4>
      <ul className="list-group list-group-flush mb-3">
        <li className="list-group-item">📌 Add new students with personal and academic details.</li>
        <li className="list-group-item">📌 Upload and display profile pictures of students.</li>
        <li className="list-group-item">📌 View a list of all students in a clean, tabular format.</li>
        <li className="list-group-item">📌 Edit or delete existing student records instantly.</li>
        <li className="list-group-item">📌 Visualize course-wise student distribution.</li>
      </ul>

      <h4 className="text-success">Technologies Used:</h4>
      <p className="mb-4">
        This project is developed using the <strong>MERN Stack</strong> (MongoDB, Express.js, React, Node.js), and styled beautifully with <strong>Bootstrap 5</strong> for a responsive and modern UI experience.
      </p>

      <blockquote className="blockquote text-center bg-white p-3 rounded border">
        <p className="mb-0">
          "Empowering institutions with simplified student data handling and a clean user experience."
        </p>
        <footer className="blockquote-footer">Student Management Team BKY</footer>
      </blockquote>
    </div>
  );
};

export default About;
