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
      <h2 className="mb-4">All Projects</h2>

      <div className="row">
        {projects.map((project) => (
          <div className="col-md-4" key={project.id}>
            <div
              className="card p-4 mb-4 shadow-lg border-0"
              style={{
                borderRadius: "15px",
                transition: "0.2s",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/project/${project.id}`)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h5>{project.title}</h5>
              <p>{project.description}</p>
              <p><b>Skills:</b> {project.required_skills}</p>
              <p><b>Team Size:</b> {project.team_size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
