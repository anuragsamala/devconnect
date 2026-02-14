import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!user) return null;

  return (
    <>
     <nav
  className="navbar navbar-expand-lg fixed-top"
  style={{
    height: "70px",
    background: "#0b0f19",   // solid black/space tone
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    padding: "0 24px",
    zIndex: 9999
  }}
>
        <span
          className="navbar-brand fw-bold fs-4"
          style={{ cursor: "pointer", color: "white", letterSpacing: "0.5px" }}
          onClick={() => navigate("/dashboard")}
        >
          DevConnect
        </span>

        <div className="ms-auto">
          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/projects")}
          >
            Projects
          </button>

          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/create")}
          >
            Create
          </button>

          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Spacer so content doesn't go under navbar */}
      <div style={{ height: "70px" }} />
    </>
  );
}

export default Navbar;
