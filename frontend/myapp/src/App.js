import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Complaint from "./pages/Complaint";
import Home from "./pages/Home";
import Login from "./pages/Login";
import StayAware from "./pages/StayAware";
import TrackTicket from "./pages/TrackTicket";

function App() {
  // Check localStorage for saved theme, default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Apply theme attribute to the root element
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      {/* Global CSS Variables - Replacing the need for App.css */}
      <style>
        {`
          :root {
            --bg-primary: #f8fafc;
            --bg-wrapper: linear-gradient(-45deg, #f3f4f6, #ffffff, #e8f5e9, #f9fafb);
            --card-bg: #ffffff;
            --text-main: #1e293b;
            --text-muted: #64748b;
            --accent: #10b981;
            --border-color: #f1f5f9;
            --nav-bg: rgba(255, 255, 255, 0.8);
          }

          [data-theme='dark'] {
            --bg-primary: #0f172a;
            --bg-wrapper: linear-gradient(-45deg, #0f172a, #1e293b, #020617, #111827);
            --card-bg: #1e293b;
            --text-main: #f1f5f9;
            --text-muted: #94a3b8;
            --accent: #34d399;
            --border-color: #334155;
            --nav-bg: rgba(15, 23, 42, 0.9);
          }

          body {
            margin: 0;
            padding: 0;
            background-color: var(--bg-primary);
            color: var(--text-main);
            transition: background-color 0.3s ease, color 0.3s ease;
          }
        `}
      </style>

      {/* We pass toggleTheme and current theme to Navbar so the button can work */}
      <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/track" element={<TrackTicket />} />
          <Route path="/StayAware" element={<StayAware />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;