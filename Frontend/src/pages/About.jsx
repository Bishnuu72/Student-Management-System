import React from "react";
import abtImg1 from "../assets/student-collaboration.jpg";
import { Link } from "react-router-dom";

const About = ({ darkMode, toggleTheme }) => {
  const whyChooseUs = [
    {
      icon: "fa-graduation-cap",
      title: "Academic Focus",
      desc: "Efficiently manage subjects, grades, attendance, and progress tracking.",
      color: "primary",
    },
    {
      icon: "fa-user-shield",
      title: "Role-Based Access",
      desc: "Ensure data privacy with separate dashboards for students, faculty, and admins.",
      color: "success",
    },
    {
      icon: "fa-chart-line",
      title: "Smart Analytics",
      desc: "Track student performance and generate insightful academic reports.",
      color: "warning",
    },
    {
      icon: "fa-comments",
      title: "Internal Communication",
      desc: "Enable smooth communication via in-app messaging and announcements.",
      color: "danger",
    },
  ];

  const processSteps = [
    {
      title: "Discovery",
      icon: "fa-search",
      desc: "Understand the institution's specific requirements and goals.",
    },
    {
      title: "Planning",
      icon: "fa-list-check",
      desc: "Create milestones, allocate roles, and define deliverables.",
    },
    {
      title: "Design",
      icon: "fa-palette",
      desc: "Build clean UI/UX prototypes focused on usability.",
    },
    {
      title: "Development",
      icon: "fa-code",
      desc: "Write robust backend and frontend code using MERN stack.",
    },
    {
      title: "Testing",
      icon: "fa-bug",
      desc: "Ensure cross-browser compatibility and zero bugs.",
    },
    {
      title: "Launch",
      icon: "fa-rocket",
      desc: "Deploy the platform on a reliable server and monitor usage.",
    },
  ];

  return (
    <section className={`${darkMode ? "bg-dark text-white" : "bg-light text-dark"} py-5`}>
      <div className="container position-relative">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 heading-hover">About Student Management System</h2>
          <p className={`${darkMode ? "text-white-50" : "text-muted"}`}>
            Smart Student Management for Smarter Institutions
          </p>
        </div>

        {/* Who We Are */}
        <div className="row align-items-center mb-5 about-section">
          <div className="col-md-6 mb-4 mb-md-0">
            <img src={abtImg1} className="img-fluid rounded shadow-sm about-img" alt="Student Collaboration" />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center text-md-start text-center">
            <h4 className="fw-semibold mb-3">Who We Are</h4>
            <p className={darkMode ? "text-white" : "text-muted"}>
              SMS (Student Management System) is a modern platform designed to streamline school and college operations.
              From admission to graduation, SMS handles all aspects of academic and administrative tasks.
            </p>
            <p className={darkMode ? "text-white" : "text-muted"}>
              We empower institutions with tools like performance tracking, attendance management, course handling,
              internal messaging, and much more—ensuring better collaboration among students, teachers, and management.
            </p>
            <div className="mt-4 text-center">
              <Link to="/contact" className="btn btn-outline-primary btn-glow">Get in touch</Link>
            </div>
          </div>
        </div>

        {/* Why Choose SMS */}
        <div className="text-center mb-4">
          <h3 className="fw-bold heading-hover">Why Choose SMS</h3>
          <p className={`${darkMode ? "text-white-50" : "text-muted"}`}>
            Our features are tailored for academic success and institutional excellence.
          </p>
        </div>
        <div className="row g-4 mb-5">
          {whyChooseUs.map((item, i) => (
            <div className="col-md-3" key={i}>
              <div className={`feature-card p-4 rounded text-center h-100 glowing-card ${darkMode ? "bg-secondary text-white" : ""}`}>
                <i className={`fa-solid ${item.icon} fa-2x text-${item.color} mb-3`}></i>
                <h5>{item.title}</h5>
                <p className={`small ${darkMode ? "text-white-50" : "text-muted"}`}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Our Process */}
        <div className="text-center mb-4">
          <h3 className="fw-bold heading-hover">Our Process</h3>
          <p className={`${darkMode ? "text-white-50" : "text-muted"}`}>
            A step-by-step workflow to deliver quality results.
          </p>
        </div>
        <div className="row mb-5">
          {processSteps.map((step, i) => (
            <div className="col-md-6 mb-4" key={i}>
              <div className={`process-card p-4 rounded d-flex align-items-start h-100 bordered-hover-card ${darkMode ? "bg-secondary text-white" : ""}`}>
                <i className={`fa-solid ${step.icon} fa-xl text-primary me-3`}></i>
                <div>
                  <h6 className="mb-1">{step.title}</h6>
                  <p className={`small ${darkMode ? "text-white-50" : "text-muted"} mb-0`}>{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Call-to-Action */}
        <div className="text-center mt-5">
          <h3 className="fw-bold heading-hover">That's all about us</h3>
          <p className={`${darkMode ? "text-white-50" : "text-muted"}`}>
            We’re excited to support your institution with our platform.
          </p>
          <Link to="/contact" className="btn btn-outline-primary btn-glow">Say Hi!</Link>
        </div>
      </div>
    </section>
  );
};

export default About;
