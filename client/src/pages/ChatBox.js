import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";

const socket = io("https://devconnect-server-b0e2.onrender.com");

function ChatBox() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  // Safe user parsing
  let user = null;
  try {
    const stored = localStorage.getItem("user");
    if (stored && stored !== "undefined") user = JSON.parse(stored);
  } catch {
    user = null;
  }

  useEffect(() => {
    loadMessages();

    socket.emit("joinProjectRoom", id);

    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("newMessage");
  }, [id]);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadMessages = async () => {
    const res = await axios.get(
      `https://devconnect-server-b0e2.onrender.com/api/messages/${id}`
    );
    setMessages(res.data);
  };

  const sendMessage = () => {
    if (!text.trim() || !user) return;

    socket.emit("sendMessage", {
      projectId: id,
      userId: user.id,
      message: text,
    });

    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-3">Project Chat</h3>

      {/* Chat window */}
      <div
        className="card p-3 mb-3 shadow-sm"
        style={{
          height: "420px",
          overflowY: "auto",
          borderRadius: "15px",
          background: "#f8f9fa",
        }}
      >
        {messages.map((m, i) => {
          const isMine =
            (m.userId && user && m.userId === user.id) ||
            (m.user_id && user && m.user_id === user.id);

          return (
            <div
              key={i}
              className={`d-flex mb-2 ${
                isMine ? "justify-content-end" : "justify-content-start"
              }`}
            >
              <div
                style={{
                  background: isMine ? "#0d6efd" : "#ffffff",
                  color: isMine ? "white" : "black",
                  padding: "10px 14px",
                  borderRadius: "15px",
                  maxWidth: "65%",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  className="fw-bold"
                  style={{
                    fontSize: "12px",
                    opacity: 0.8,
                    marginBottom: "2px",
                  }}
                >
                  {isMine ? "You" : m.username || m.name}
                </div>
                <div style={{ wordBreak: "break-word" }}>{m.message}</div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="d-flex">
        <input
          className="form-control me-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type message and press Enter..."
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
