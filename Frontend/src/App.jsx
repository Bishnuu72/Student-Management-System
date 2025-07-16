import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StudentLogin from "./layout/StudentLogin";
import AdminLogin from "./layout/AdminLogin";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? "dark-theme" : "light-theme"}>
      <Router>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="student-login" element={<StudentLogin />} />
          <Route path="admin-login" element={<AdminLogin />} />
        </Routes>
        <Footer darkMode={darkMode} toggleTheme={toggleTheme} />
      </Router>
    </div>
  );
}

export default App;
