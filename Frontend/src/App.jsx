import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StudentLogin from "./layout/StudentLogin";
import AdminLogin from "./layout/AdminLogin";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminPanel/AdminDashboard";
import StudentState from "./context/StudentState";
import AddStudent from "./pages/AdminPanel/AddStudent";
import EditStudent from "./pages/AdminPanel/EditStudent";
import AdminRegister from "./layout/AdminRegister";
import Contact from "./pages/Contact";

function LayoutWrapper({ darkMode, toggleTheme }) {
  const location = useLocation();

  // List of routes that should NOT show Navbar/Footer
  const excludedRoutes = ["/admin-panel", "/add-student", "/edit-student"];

  const shouldShowLayout = !excludedRoutes.includes(location.pathname);

  return (
    <><StudentState>
      {shouldShowLayout && <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />}
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} toggleTheme={toggleTheme} />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/profile" element={<Profile darkMode={darkMode} toggleTheme={toggleTheme} />} />
        <Route path="/admin-panel" element={<AdminDashboard darkMode={darkMode} toggleTheme={toggleTheme} />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student" element={<EditStudent />} />
        <Route path="/contact" element={<Contact darkMode={darkMode} toggleTheme={toggleTheme} />} />
      </Routes>
      {shouldShowLayout && <Footer darkMode={darkMode} toggleTheme={toggleTheme} />}
      </StudentState>
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? "dark-theme" : "light-theme"}>
      <Router>
        <LayoutWrapper darkMode={darkMode} toggleTheme={toggleTheme} />
      </Router>
    </div>
  );
}

export default App;
