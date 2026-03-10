import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const register = async () => {
    try {
      const res = await axios.post(
        "https://devconnect-server-b0e2.onrender.com/api/auth/register",
        form
      );

      alert(res.data.message);

      if (res.data.message === "User registered successfully") {
        navigate("/");
      }

    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="login-bg">
      <div className="overlay"></div>

      <div className="login-card">
        <h2 className="title">Create Account</h2>

        <input
          className="input"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          className="input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button className="login-btn" onClick={register}>
          Register
        </button>

        <p className="text-light mt-3 text-center">
          Already have an account?{" "}
          <span
            style={{ cursor: "pointer", color: "#00f5ff" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;