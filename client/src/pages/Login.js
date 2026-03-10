import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://devconnect-server-b0e2.onrender.com/api/auth/login",
        { email, password }
      );

      if (!res.data.user) {
        alert("Login failed");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-bg">

      {/* 🌌 Moving star particles layer */}
      <div className="stars"></div>

      {/* 🌑 Dark overlay */}
      <div className="overlay"></div>

      {/* ✨ Glowing Login Card */}
      <div className="login-card">
        <h2 className="title">DevConnect</h2>

        <form onSubmit={handleLogin}>
          <input
            className="input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        {/* Signup option */}
        <p className="text-light text-center mt-3">
          Don't have an account?{" "}
          <span
            style={{ color: "#00f5ff", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;