import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 5%", 
    backgroundColor: "var(--nav-bg)",
    backdropFilter: "blur(15px)",
    color: "var(--text-main)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    borderBottom: "1px solid var(--border-color)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    width: "100%",
    boxSizing: "border-box", 
  },
  siteTitle: {
    fontSize: "24px",
    fontWeight: "900",
    textDecoration: "none",
    color: "var(--accent)",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    zIndex: 1001,
  },
  linkList: {
    display: "flex",
    alignItems: "center",
    listStyle: "none",
    margin: 0,
    padding: 0,
    transition: "right 0.4s ease-in-out",
  },
  listItem: {
    marginLeft: "25px",
    display: "flex",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "var(--text-muted)",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  adminBtn: {
    textDecoration: "none",
    backgroundColor: "var(--accent)",
    color: "#fff",
    padding: "8px 20px",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    border: "none",
    cursor: "pointer",
  },
  logoutBtn: {
    backgroundColor: "#e74c3c", 
    color: "#fff",
    padding: "8px 20px",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    cursor: "pointer",
    gap: "5px",
    zIndex: 1001,
  },
  line: {
    width: "25px",
    height: "3px",
    backgroundColor: "var(--accent)",
    borderRadius: "5px",
    transition: "all 0.3s ease",
  }
};

export default function Navbar({ toggleTheme, currentTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isAdminPage = location.pathname === "/Admin";

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/Login");
    setIsOpen(false);
  };

  return (
    <nav style={styles.nav}>
      <style>
        {`
          @media (max-width: 992px) {
            .nav-links {
              position: fixed;
              right: ${isOpen ? "0" : "-100%"};
              top: 0;
              height: 100vh;
              width: 75%;
              background-color: var(--nav-bg);
              flex-direction: column !important;
              justify-content: center !important;
              box-shadow: -10px 0 30px rgba(0,0,0,0.2);
              backdrop-filter: blur(20px);
            }
            .nav-item {
              margin: 20px 0 !important;
              margin-left: 0 !important;
            }
            .hamburger-icon {
              display: flex !important;
            }
          }
        `}
      </style>

      <Link to="/" style={styles.siteTitle} onClick={() => setIsOpen(false)}>
        <span style={{ color: "var(--text-main)" }}>FIX</span>IT.
      </Link>

      <div className="hamburger-icon" style={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        <div style={{...styles.line, transform: isOpen ? "rotate(45deg) translate(5px, 6px)" : "none"}}></div>
        <div style={{...styles.line, opacity: isOpen ? 0 : 1}}></div>
        <div style={{...styles.line, transform: isOpen ? "rotate(-45deg) translate(5px, -6px)" : "none"}}></div>
      </div>
      
      <ul className="nav-links" style={styles.linkList}>
        <li className="nav-item" style={styles.listItem}>
          <NavLink to="/" onClick={() => setIsOpen(false)} style={({ isActive }) => ({ ...styles.link, color: isActive ? "var(--accent)" : "var(--text-muted)" })}>Dashboard</NavLink>
        </li>
        <li className="nav-item" style={styles.listItem}>
          <NavLink to="/complaint" onClick={() => setIsOpen(false)} style={({ isActive }) => ({ ...styles.link, color: isActive ? "var(--accent)" : "var(--text-muted)" })}>New Complaint</NavLink>
        </li>
        <li className="nav-item" style={styles.listItem}>
          <NavLink to="/track" onClick={() => setIsOpen(false)} style={({ isActive }) => ({ ...styles.link, color: isActive ? "var(--accent)" : "var(--text-muted)" })}>Track Ticket</NavLink>
        </li>
        <li className="nav-item" style={styles.listItem}>
          <NavLink to="/StayAware" onClick={() => setIsOpen(false)} style={({ isActive }) => ({ ...styles.link, color: isActive ? "var(--accent)" : "var(--text-muted)" })}>Guidelines</NavLink>
        </li>
        <li className="nav-item" style={styles.listItem}>
          <NavLink to="/about" onClick={() => setIsOpen(false)} style={({ isActive }) => ({ ...styles.link, color: isActive ? "var(--accent)" : "var(--text-muted)" })}>About</NavLink>
        </li>
        <li className="nav-item" style={styles.listItem}>
          {isAdminPage ? (
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          ) : (
            <NavLink to="/Login" onClick={() => setIsOpen(false)} style={styles.adminBtn}>Admin</NavLink>
          )}
        </li>
        <li className="nav-item" style={styles.listItem}>
          <button onClick={toggleTheme} style={{background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '18px'}}>
            <i className={currentTheme === 'light' ? "fas fa-moon" : "fas fa-sun"}></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}