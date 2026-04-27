import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import NotificationBell from "./NotificationBell";

export default function Navbar({ auth, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = !!auth?.role;

  const navLinks = [
    ...(!isLoggedIn ? [{ path: "/", label: "Home" }] : []),

    ...(auth?.role === "user"
      ? [
          { path: "/dashboard", label: "Dashboard" },
          { path: "/schedule", label: "Schedule" },
          { path: "/myschedule", label: "My Sessions" },
          { path: "/chat", label: "💬 Chat" },



        ]
      : []),

    ...(auth?.role === "admin"
      ? [{ path: "/admin", label: "Admin Panel" }]
      : []),
      
      ...(auth?.role === "counselor"
  ? [
      { path: "/counselor", label: "Dashboard" },
      { path: "/myschedule", label: "My Sessions" },
      { path: "/chat", label: "💬 Chat" }
    ]
  : []),
  

    { path: "/careers", label: "Career Paths" },
    { path: "/counselors", label: "Mentors" },
  ];

  const handleLogout = () => {
    onLogout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        {/* LOGO */}
        <Link to="/" style={styles.logo}>
          <div style={styles.logoMark}>🚀</div>
          <span style={styles.logoText}>
            Career<span style={{ color: "#8b5cf6" }}>Forge</span>
          </span>
        </Link>

        {/* LINKS */}
        <div style={styles.links}>
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
  key={link.path}
  to={link.path}
  style={{
    ...styles.link,
    ...(active ? styles.activeLink : {}),
  }}
  onMouseEnter={(e) => {
    if (!active) {
      e.target.style.background = "rgba(255,255,255,0.06)";
      e.target.style.color = "#fff";
    }
  }}
  onMouseLeave={(e) => {
    if (!active) {
      e.target.style.background = "transparent";
      e.target.style.color = "#94a3b8";
    }
  }}
>
  {link.label}
</Link>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.authArea}>
          {auth?.role && <NotificationBell />}

          {auth?.role ? (
            <div style={styles.roleChip}>
              <div style={styles.avatar}>
                {(auth.name || "U")[0].toUpperCase()}
              </div>

              <div>
                <div style={styles.username}>
                  {auth.role === "admin"
  ? "🛡️ Admin"
  : auth.role === "counselor"
  ? "🎓 Counselor"
  : auth.name?.split(" ")[0]}
                </div>
                {auth.role === "user" && (
                  <div style={styles.subText}>Student</div>
                )}
                {auth.role === "counselor" && (
                   <div style={styles.subText}>Mentor</div>
)}
              </div>

              <button onClick={handleLogout} style={styles.logout}>
                Logout
              </button>
            </div>
          ) : (
            <div style={styles.authButtons}>
              <div style={styles.authSwitch}>
  
  <Link
    to="/login"
    style={{
      ...styles.switchBtn,
      ...(location.pathname === "/login" ? styles.activeSwitch : {})
    }}
  >
    Sign In
  </Link>

  <Link
    to="/signup"
    style={{
      ...styles.switchBtn,
      ...(location.pathname === "/signup" ? styles.activeSwitch : {})
    }}
  >
    Sign Up
  </Link>

</div>
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span style={styles.bar} />
          <span style={styles.bar} />
          <span style={styles.bar} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {auth?.role ? (
            <button onClick={handleLogout} style={styles.mobileBtn}>
              Logout
            </button>
          ) : (
            <>
              <Link
  to="/login"
  style={styles.signIn}
  onMouseEnter={(e) => {
    e.target.style.background = "rgba(255,255,255,0.08)";
    e.target.style.color = "#fff";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "transparent";
    e.target.style.color = "#cbd5f5";
  }}
>
  Sign In
</Link>
              <Link
  to="/signup"
  style={styles.getStarted}
  onMouseEnter={(e) => {
    e.target.style.transform = "translateY(-2px) scale(1.03)";
    e.target.style.boxShadow = "0 12px 35px rgba(79,70,229,0.7)";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "none";
    e.target.style.boxShadow = "0 8px 25px rgba(79,70,229,0.5)";
  }}
>
  Get Started →
</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,

  background:
    "linear-gradient(to right, rgba(10,10,25,0.85), rgba(15,23,42,0.85))",

  backdropFilter: "blur(18px)",
  borderBottom: "1px solid rgba(99,102,241,0.2)",

  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
},

  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
  },

  logoMark: {
    width: "38px",
    height: "38px",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "18px",
    boxShadow: "0 6px 18px rgba(124,58,237,0.5)",
  },

  logoText: {
    fontSize: "1.3rem",
    fontWeight: "800",
    color: "#fff",
  },

  links: {
    display: "flex",
    gap: "6px",
    flex: 1,
  },

  link: {
  padding: "8px 16px",
  borderRadius: "999px",
  fontSize: "0.9rem",
  fontWeight: "600",
  color: "#94a3b8",
  textDecoration: "none",
  transition: "all 0.25s ease",
},

  activeLink: {
  color: "#fff",
  background: "rgba(99,102,241,0.25)",
  boxShadow: "0 0 12px rgba(99,102,241,0.4)",
},

  authArea: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  authButtons: {
    display: "flex",
    gap: "10px",
  },

signIn: {
  color: "#cbd5f5",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "0.9rem",
  padding: "8px 16px",
  borderRadius: "999px",
  transition: "all 0.25s ease",
},  

  getStarted: {
    padding: "10px 20px",
    borderRadius: "999px",
    background: "linear-gradient(135deg,#7c3aed,#9333ea)",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600",
    boxShadow: "0 6px 20px rgba(124,58,237,0.4)",
  },

  roleChip: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "6px 14px 6px 6px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#7c3aed,#f43f5e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "700",
  },

  username: {
    fontSize: "0.85rem",
    color: "#fff",
    fontWeight: "700",
  },

  subText: {
    fontSize: "0.7rem",
    color: "#a78bfa",
  },

  logout: {
    background: "none",
    border: "none",
    color: "#9ca3af",
    cursor: "pointer",
    fontSize: "0.8rem",
  },

  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "4px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },

  bar: {
    width: "22px",
    height: "2px",
    background: "#9ca3af",
  },

  mobileMenu: {
    padding: "20px",
    background: "rgba(15,15,30,0.95)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  mobileLink: {
    padding: "12px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#9ca3af",
  },

  mobileBtn: {
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
    border: "1px solid #333",
    color: "#fff",
    textDecoration: "none",
  },

  primaryBtn: {
    background: "#7c3aed",
  },authSwitch: {
  display: "flex",
  background: "rgba(255,255,255,0.06)",
  borderRadius: "999px",
  padding: "4px",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(10px)",
},

switchBtn: {
  padding: "8px 16px",
  borderRadius: "999px",
  textDecoration: "none",
  fontSize: "0.85rem",
  fontWeight: "600",
  color: "#cbd5f5",
  transition: "all 0.25s ease",
},

activeSwitch: {
  background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
  color: "#fff",
  boxShadow: "0 4px 15px rgba(124,58,237,0.5)",
},
};