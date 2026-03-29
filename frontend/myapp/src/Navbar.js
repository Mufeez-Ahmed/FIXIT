import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import React from "react";

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 40px",
    backgroundColor: "var(--nav-bg)", // Variable
    backdropFilter: "blur(15px)",
    color: "var(--text-main)", // Variable
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    borderBottom: "1px solid var(--border-color)", // Variable
    position: "sticky",
    top: 0,
    zIndex: 1000,
    transition: "all 0.3s ease",
  },
  siteTitle: {
    fontSize: "24px",
    fontWeight: "900",
    textDecoration: "none",
    color: "var(--accent)", // Variable
    textTransform: "uppercase",
    letterSpacing: "1.5px",
  },
  linkList: {
    display: "flex",
    alignItems: "center",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  listItem: {
    marginLeft: "25px",
    display: "flex",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "var(--text-muted)", // Variable
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  adminBtn: {
    textDecoration: "none",
    backgroundColor: "var(--accent)", // Variable
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
    transition: "background-color 0.3s ease",
  },
  toggleBtn: {
    background: "none",
    border: "1px solid var(--border-color)",
    borderRadius: "10px",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    color: "var(--accent)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    marginLeft: "20px",
    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  }
};

export default function Navbar({ toggleTheme, currentTheme }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname === "/Admin";

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/Login");
  };

  return (
    <nav style={styles.nav}>
      {/* Brand Identity */}
      <Link to="/" style={styles.siteTitle}>
        <span style={{ color: "var(--text-main)" }}>FIX</span>IT.
      </Link>
      
      <ul style={styles.linkList}>
        <li style={styles.listItem}>
          <NavLink 
            to="/" 
            style={({ isActive }) => ({
              ...styles.link,
              color: isActive ? "var(--accent)" : "var(--text-muted)"
            })}
          >
            Dashboard
          </NavLink>
        </li>
        
        <li style={styles.listItem}>
          <NavLink 
            to="/complaint" 
            style={({ isActive }) => ({
              ...styles.link,
              color: isActive ? "var(--accent)" : "var(--text-muted)"
            })}
          >
            New Complaint
          </NavLink>
        </li>

        <li style={styles.listItem}>
          <NavLink to="/track" style={({ isActive }) => ({ ...styles.link, color: isActive ? "var(--accent)" : "var(--text-muted)" })}>
            Track Ticket
          </NavLink>
        </li>

        <li style={styles.listItem}>
          <NavLink to="/StayAware" style={({ isActive }) => ({ ...styles.link, color: isActive ? "var(--accent)" : "var(--text-muted)" })}>
            Guidelines
          </NavLink>
        </li>

        <li style={styles.listItem}>
          <NavLink 
            to="/about" 
            style={({ isActive }) => ({
              ...styles.link,
              color: isActive ? "var(--accent)" : "var(--text-muted)"
            })}
          >
            About
          </NavLink>
        </li>

        <li style={styles.listItem}>
          {isAdminPage ? (
            <button 
              onClick={handleLogout} 
              style={styles.logoutBtn}
              onMouseOver={(e) => e.target.style.backgroundColor = "#c0392b"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#e74c3c"}
            >
              Logout
            </button>
          ) : (
            <NavLink 
              to="/Login" 
              style={styles.adminBtn}
              onMouseOver={(e) => e.target.style.opacity = "0.8"}
              onMouseOut={(e) => e.target.style.opacity = "1"}
            >
              Admin
            </NavLink>
          )}
        </li>

        {/* STEP 2: THEME TOGGLE BUTTON */}
        <li style={styles.listItem}>
          <button 
            onClick={toggleTheme} 
            style={styles.toggleBtn}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.1) rotate(15deg)";
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1) rotate(0deg)";
              e.currentTarget.style.borderColor = "var(--border-color)";
            }}
          >
            <i className={currentTheme === 'light' ? "fas fa-moon" : "fas fa-sun"}></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}