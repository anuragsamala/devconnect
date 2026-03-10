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
    <div className="projects-bg">

      <div className="projects-overlay"></div>

      <div className="projects-content container pt-5">

        <h2 className="fw-bold mb-4 text-white">🚀 Explore Projects</h2>

        <div className="row">
          {projects.map((project) => (
            <div className="col-md-4 mb-4" key={project.id}>
              <div
                className="card project-card border-0 shadow-sm p-4"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <h5 className="fw-bold mb-2">🚀 {project.title}</h5>

                <p className="text-muted project-desc">
                  {project.description}
                </p>

                <div className="mb-2">
                  <b>Skills:</b>{" "}
                  {project.required_skills
                    ?.split(",")
                    .map((skill, i) => (
                      <span key={i} className="badge bg-primary me-1">
                        {skill.trim()}
                      </span>
                    ))}
                </div>

                <p className="text-muted mb-2">
                  👥 Team Size: {project.team_size}
                </p>

                <div className="mt-3 d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/project/${project.id}`);
                    }}
                  >
                    View
                  </button>

                  <button
                    className="btn btn-sm btn-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Join
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Projects;