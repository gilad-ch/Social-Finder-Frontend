import React, { useState, useEffect } from "react";
import { Trash2, Plus, X } from "lucide-react";
import { fetchUsers } from "../../services/api";
import { Twitter } from "lucide-react";

function TwitterAdminPanel() {
  const [users, setUsers] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInput, setNewInput] = useState("");

  // fetch users - filters can be added here
  useEffect(() => {
    setUsers(fetchUsers());
  }, []);

  const handleDelete = (username) => {
    setUsers(users.filter((user) => user.username !== username)); // Add API call to delete user
    setShowDeleteConfirm(null);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newInput) {
      setUsers([...users, { username: newInput, lastScan: "Not scanned yet" }]); // Add API call to post new user
      setNewInput("");
      setShowAddForm(false);
    }
  };

  return (
    <div className="admin-panel">
      <div className="upper-section">
        {/* <span className="panel-icon">{React.createElement(Twitter)}</span> */}
      </div>
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Last Scan</th>
              <th>
                {" "}
                {/* last child must be delete \ add button!!!  */}
                <button
                  className="add-user-btn"
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus size={20} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.lastScan}</td>
                <td>
                  {" "}
                  {/* last child must be delete \ add button!!!  */}
                  <button
                    className="delete-btn"
                    onClick={() => setShowDeleteConfirm(user.username)}
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeleteConfirm && (
        <div className="modal" onClick={() => setShowDeleteConfirm(null)}>
          <div className="modal-content">
            <h3>Are you sure?</h3>
            <p>
              Do you want to delete <strong>{showDeleteConfirm}</strong>?
            </p>
            <div className="modal-actions">
              <button onClick={() => handleDelete(showDeleteConfirm)}>
                Yes
              </button>
              <button onClick={() => setShowDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New User</h3>
            <form onSubmit={handleAddUser}>
              <input
                type="text"
                placeholder="Enter Twitter @username"
                value={`${newInput}`}
                onChange={(e) => setNewInput(`${e.target.value}`)}
                required
              />
              <div className="modal-actions">
                <button type="submit">Add</button>
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TwitterAdminPanel;
