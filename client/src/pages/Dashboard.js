import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      setUser(null);
    }

    setLoading(false);
  }, []);

  // Redirect ONLY after checking storage
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  // Socket
  useEffect(() => {
    if (!user) return;

    const socket = io("http://localhost:5000");
    socket.emit("registerUser", user.id);

    socket.on("notification", (data) => {
      alert(data.message);
    });

    return () => socket.disconnect();
  }, [user]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) return null;
  if (!user) return null;

  return (
    <div className="container mt-5">
      <h2>Welcome {user.name} 👋</h2>
      <p className="mb-4">Your DevConnect Dashboard</p>

      <div className="row">
        <div className="col-md-4">
          <button
            className="btn btn-primary w-100 mb-3 py-3"
            onClick={() => navigate("/projects")}
          >
            View Projects
          </button>
        </div>

        <div className="col-md-4">
          <button
            className="btn btn-primary w-100 mb-3 py-3"
            onClick={() => navigate("/create")}
          >
            Create Project
          </button>
        </div>

        <div className="col-md-4">
          <button
            className="btn btn-primary w-100 mb-3 py-3"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
        </div>
      </div>

      <button className="btn btn-danger w-100 py-3" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
