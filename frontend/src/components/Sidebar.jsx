import React from "react";
import "../css/Sidebar.css";

function Sidebar({ isOpen, setIsOpen }) {
  const statuses = ["New", "Approved", "Rejected", "Unknown"];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? "✕" : "☰"}
      </button>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
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
