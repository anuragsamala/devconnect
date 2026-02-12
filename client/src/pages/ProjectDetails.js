import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const res = await axios.get(
        `https://devconnect-server-b0e2.onrender.com/api/projects/${id}`
      );
      setProject(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!project) return <h3 className="m-5">Loading...</h3>;

  return (
    <div className="container mt-5">
      <h2>{project.title}</h2>
      <p>{project.description}</p>

      <p><b>Skills Needed:</b> {project.required_skills}</p>
      <p><b>Team Size:</b> {project.team_size}</p>
      <p><b>Status:</b> {project.status}</p>

      {/* Send Join Request Button */}
      <button
        className="btn btn-primary mt-3"
        onClick={async () => {
          try {
            await axios.post(
              "https://devconnect-server-b0e2.onrender.com/api/join/send",
              {
                project_id: id,
                user_id: user.id,
              }
            );

            alert("Join request sent!");
          } catch (err) {
            alert("Error sending request");
          }
        }}
      >
        Send Join Request
      </button>

      {/* View Requests Button (Only for Owner) */}
      {user?.id === project.owner_id && (
        <button
          className="btn btn-dark mt-3 ms-3"
          onClick={() => navigate(`/project/${id}/requests`)}
        >
          View Join Requests
        </button>
      )}

      <button
        className="btn btn-warning mt-3 ms-3"
        onClick={() => navigate(`/project/${id}/tasks`)}
      >
        Open Task Board
      </button>
    </div>
  );
}

export default ProjectDetails;
