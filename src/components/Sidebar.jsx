import React from "react";
import { useState } from "react";
import { PlusCircle, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import "../css/Sidebar.css";

function Sidebar({ currentStatus, setStatus }) {
  const statuses = [
    { name: "New", icon: PlusCircle, color: "#2196F3", statusCode: 0 },
    { name: "Watchlist", icon: CheckCircle, color: "#4CAF50", statusCode: 1 },
  ];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="sidebar-section">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? "✕" : "☰"}
      </button>
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Status Filter</h2>
        </div>
        <nav className="sidebar-nav">
          {statuses.map((status) => (
            <button
              key={status.statusCode}
              className={`status-button ${
                currentStatus === status.statusCode ? "active" : ""
              }`}
              onClick={() => setStatus(status.statusCode)}
              style={{ "--status-color": status.color }}
            >
              <status.icon size={24} />
              <span>{status.name}</span>
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
