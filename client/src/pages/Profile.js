import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://devconnect-server-b0e2.onrender.com/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return <h4 className="text-center mt-5">Loading profile...</h4>;

  return (
    <div className="dashboard-bg">
      <div className="overlay"></div>

      <div className="dashboard-content container">

        {/* Profile Header */}
        <div className="glass-header text-center mb-4">

          <h2 className="mb-2">{user.name}</h2>

          <p className="text-light">{user.email}</p>

          {user.bio && (
            <p style={{ maxWidth: "600px", margin: "auto" }}>
              {user.bio}
            </p>
          )}

          {/* Skills */}
          <div className="mt-3">
            {user.skills &&
              user.skills.map((skill, i) => (
                <span key={i} className="badge bg-primary me-2">
                  {skill}
                </span>
              ))}
          </div>
        </div>

        {/* Stats */}
        <div className="row text-center mb-4">

          <div className="col-md-4">
            <div className="glass-card p-4">
              <h3>{user.projectsCreated || 0}</h3>
              <p>Projects Created</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card p-4">
              <h3>{user.projectsJoined || 0}</h3>
              <p>Projects Joined</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card p-4">
              <h3>{user.experience || "Fresher"}</h3>
              <p>Experience</p>
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="row">
          <div className="col-md-6">
            <button className="dash-btn primary">
              Edit Profile
            </button>
          </div>

          <div className="col-md-6">
            <button className="dash-btn success">
              View My Projects
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;