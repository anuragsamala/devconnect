import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);
const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
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
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
