import { useState } from "react";
import { useNavigate } from "react-router-dom";
const foodImg = "https://images.unsplash.com/photo-1504674900247-0877df9cc836";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (isLogin) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (u) =>
          u.username === username &&
          u.password === password &&
          u.role === role
      );

      if (user) {
        localStorage.setItem("role", role);
        navigate("/home");
      } else {
        alert("Invalid credentials");
      }
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push({ username, password, role });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registered successfully!");
      setIsLogin(true);
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT IMAGE */}
      <div style={styles.left}>
        <img src={foodImg} alt="food" style={styles.image} />
      </div>

      {/* RIGHT LOGIN CARD */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={{ color: "#333" }}>
            {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
          </h2>

          <input
            style={styles.input}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            style={styles.input}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="ngo">NGO</option>
          </select>

          <button style={styles.button} onClick={handleSubmit}>
            {isLogin ? "Login" : "Register"}
          </button>

          <p
            style={{ cursor: "pointer", color: "#555" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "New user? Register"
              : "Already have account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
  },
  left: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  right: {
    flex: 1,
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "rgba(255,255,255,0.9)",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#ff7e5f",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;