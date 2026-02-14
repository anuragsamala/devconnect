import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState([]);

  // Load user
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

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  // Socket
  useEffect(() => {
    if (!user) return;

    const socket = io("https://devconnect-server-b0e2.onrender.com");
    socket.emit("registerUser", user.id);

    socket.on("notification", (data) => {
      alert(data.message);
    });

    return () => socket.disconnect();
  }, [user]);

  // Skill-based recommendations
  useEffect(() => {
    if (!user) return;

    axios
      .get(`https://devconnect-server-b0e2.onrender.com/api/match/${user.id}`)
      .then((res) => setRecommended(res.data))
      .catch((err) => console.log(err));
  }, [user]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) return null;
  if (!user) return null;

  return (
    <div className="dashboard-bg">
      <div className="overlay" />

      <div className="dashboard-content container">
        {/* Header */}
        <div className="glass-header mb-4">
          <h2 className="fw-bold mb-1">Welcome {user.name} 👋</h2>
          <p className="mb-0">Your DevConnect workspace</p>
        </div>

        {/* Recommended Projects */}
        <div className="mb-4">
          <h4 className="fw-bold mb-3">⭐ Recommended Projects</h4>

          {recommended.length === 0 ? (
            <p className="text-light">No matching projects yet</p>
          ) : (
            <div className="row">
              {recommended.map((p) => (
                <div className="col-md-4" key={p.id}>
                  <div
                    className="glass-card p-3 mb-3"
                    onClick={() => navigate(`/project/${p.id}`)}
                  >
                    <h5 className="fw-bold">{p.title}</h5>
                    <small className="text-light">
                      Skills: {p.required_skills}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="row">
          <div className="col-md-4">
            <button
              className="dash-btn primary"
              onClick={() => navigate("/projects")}
            >
              View Projects
            </button>
          </div>

          <div className="col-md-4">
            <button
              className="dash-btn success"
              onClick={() => navigate("/create")}
            >
              Create Project
            </button>
          </div>

          <div className="col-md-4">
            <button
              className="dash-btn dark"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
          </div>
        </div>

        {/* Logout */}
        <button className="logout-btn mt-4" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
