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

  // Hide navbar if not logged in
  if (!user) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span
        className="navbar-brand fw-bold fs-4"
        style={{ cursor: "pointer" }}
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
  );
}

export default Navbar;
