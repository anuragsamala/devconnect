import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function JoinRequests() {
  const { id } = useParams();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `https://devconnect-server-b0e2.onrender.com/api/join/${id}`
      );
      setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const accept = async (request_id) => {
    try {
      await axios.post(
        "https://devconnect-server-b0e2.onrender.com/api/join/accept",
        {
          request_id,
          role: "Developer",
        }
      );

      alert("Request accepted!");
      fetchRequests();
    } catch (err) {
      alert("Error accepting request");
    }
  };

  const reject = async (request_id) => {
    try {
      await axios.post(
        "https://devconnect-server-b0e2.onrender.com/api/join/reject",
        {
          request_id,
        }
      );

      alert("Request rejected!");
      fetchRequests();
    } catch (err) {
      alert("Error rejecting request");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Join Requests</h2>

      {requests.length === 0 ? (
        <p>No requests yet</p>
      ) : (
        requests.map((req) => (
          <div key={req.id} className="card p-3 mt-3 shadow-sm">
            <p><b>User ID:</b> {req.user_id}</p>
            <p><b>Status:</b> {req.status}</p>

            <button
              className="btn btn-success me-2"
              onClick={() => accept(req.id)}
            >
              Accept
            </button>

            <button
              className="btn btn-danger"
              onClick={() => reject(req.id)}
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default JoinRequests;
