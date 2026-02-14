import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";

const socket = io("https://devconnect-server-b0e2.onrender.com");

function ChatBox() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadMessages();

    socket.emit("joinProjectRoom", id);

    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("newMessage");
  }, []);

  const loadMessages = async () => {
    const res = await axios.get(
      `https://devconnect-server-b0e2.onrender.com/api/messages/${id}`
    );
    setMessages(res.data);
  };

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      projectId: id,
      userId: user.id,
      message: text,
    });

    setText("");
  };

  return (
    <div className="container mt-4">
      <h3>Project Chat</h3>

      <div
        className="card p-3 mb-3"
        style={{ height: "350px", overflowY: "auto" }}
      >
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <b>{m.username || m.name}:</b>
{m.message}
          </div>
        ))}
      </div>

      <div className="d-flex">
        <input
          className="form-control me-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
