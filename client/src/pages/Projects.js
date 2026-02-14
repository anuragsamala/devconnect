import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "https://devconnect-server-b0e2.onrender.com/api/projects"
      );
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Explore Projects</h2>

      <div className="row">
        {projects.map((project) => (
          <div className="col-md-4" key={project.id}>
            <div
              className="card border-0 shadow-sm p-4 mb-4"
              style={{
                borderRadius: "16px",
                cursor: "pointer",
                transition: "0.25s",
                background: "white",
              }}
              onClick={() => navigate(`/project/${project.id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(0,0,0,0.05)";
              }}
            >
              <h5 className="fw-bold">{project.title}</h5>

              <p className="text-muted" style={{ minHeight: "50px" }}>
                {project.description}
              </p>

              <p className="mb-1">
                <b>Skills:</b> {project.required_skills}
              </p>

              <p className="mb-0">
                <b>Team Size:</b> {project.team_size}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
