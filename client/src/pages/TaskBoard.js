import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function TaskBoard() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(
      `https://devconnect-server-b0e2.onrender.com/api/tasks/${id}`
    );
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTask) return;

    await axios.post(
      "https://devconnect-server-b0e2.onrender.com/api/tasks/add",
      {
        project_id: id,
        title: newTask,
      }
    );

    setNewTask("");
    fetchTasks();
  };

  const updateStatus = async (task_id, status) => {
    await axios.post(
      "https://devconnect-server-b0e2.onrender.com/api/tasks/update",
      {
        task_id,
        status,
      }
    );

    fetchTasks();
  };

  const filterTasks = (status) =>
    tasks.filter((t) => t.status === status);

  return (
    <div className="container mt-5">
      <h2>Task Board</h2>

      {/* Add Task */}
      <div className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className="row">
        {/* TODO */}
        <div className="col-md-4">
          <h4 className="text-primary">TODO</h4>
          {filterTasks("TODO").map((task) => (
            <div key={task.id} className="card p-2 mb-2">
              {task.title}
              <button
                className="btn btn-sm btn-success mt-2"
                onClick={() => updateStatus(task.id, "IN_PROGRESS")}
              >
                Move → In Progress
              </button>
            </div>
          ))}
        </div>

        {/* IN PROGRESS */}
        <div className="col-md-4">
          <h4 className="text-warning">IN PROGRESS</h4>
          {filterTasks("IN_PROGRESS").map((task) => (
            <div key={task.id} className="card p-2 mb-2">
              {task.title}
              <button
                className="btn btn-sm btn-success mt-2"
                onClick={() => updateStatus(task.id, "DONE")}
              >
                Move → Done
              </button>
            </div>
          ))}
        </div>

        {/* DONE */}
        <div className="col-md-4">
          <h4 className="text-success">DONE</h4>
          {filterTasks("DONE").map((task) => (
            <div key={task.id} className="card p-2 mb-2 bg-light">
              {task.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskBoard;
