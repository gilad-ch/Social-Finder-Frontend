import React from "react";
import { useState } from "react";
import "../css/Sidebar.css";

function Sidebar({ currentStatus, setStatus }) {
  const statuses = ["New", "Approved", "Rejected", "Unknown"];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? "✕" : "☰"}
      </button>
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <section className="sidebar-section">
          <h2>Status</h2>
          <ul>
            {statuses.map((status) => (
              <li key={status}>
                <a href="#">{status}</a>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </>
  );
}

export default Sidebar;
