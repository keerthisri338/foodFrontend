import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <h2 style={{ color: "#fff" }}>🍽 Food App</h2>

      <div>
        {role && (
          <>
            <Link to="/home" style={styles.link}>Home</Link>
            <Link to="/orders" style={styles.link}>Orders</Link>
            {role === "admin" && (
              <Link to="/add" style={styles.link}>Add Food</Link>
            )}
            <button onClick={handleLogout} style={styles.logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
  },
  link: {
    margin: "0 10px",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logout: {
    marginLeft: "10px",
    padding: "6px 10px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },
};

export default Navbar;