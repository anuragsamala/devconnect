import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:5000/api/projects/create", {
        title,
        description,
        required_skills: skills,
        team_size: teamSize,
        owner_id: user.id
      });

      alert("Project created!");
      navigate("/projects");
    } catch (err) {
      alert("Error creating project");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Project</h2>

      <div className="card p-4 mt-3 shadow">
        <input
          className="form-control mb-3"
          placeholder="Project Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Required Skills (React, Node, etc)"
          onChange={(e) => setSkills(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Team Size"
          onChange={(e) => setTeamSize(e.target.value)}
        />

        <button className="btn btn-success" onClick={handleCreate}>
          Create Project
        </button>
      </div>
    </div>
  );
}

export default CreateProject;
