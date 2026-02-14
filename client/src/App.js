import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import Profile from "./pages/Profile";
import ProjectDetails from "./pages/ProjectDetails";
import JoinRequests from "./pages/JoinRequests";
import TaskBoard from "./pages/TaskBoard";
import Navbar from "./components/Navbar";
import ChatBox from "./pages/ChatBox";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/project/:id/requests" element={<JoinRequests />} />
        <Route path="/project/:id/tasks" element={<TaskBoard />} />
        <Route path="/project/:id/chat" element={<ChatBox />} />

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
