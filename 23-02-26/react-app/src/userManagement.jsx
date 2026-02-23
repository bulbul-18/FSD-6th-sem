import React, { useState } from "react";
import "./UserManagement.css";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!form.id) newErrors.id = "ID is required";
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format"; 
    }

    if (users.find((u) => u.id === form.id)) {
      newErrors.id = "ID already exists";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addUser = () => {
    if (!validate()) return;
    setUsers([...users, form]);
    setForm({ id: "", name: "", email: "" });
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const filteredUsers = searchId
    ? users.filter((u) => u.id === searchId)
    : users;

  return (
    <div className="dashboard">

    {/* LEFT PANEL */}
    <div className="left-panel">
      <h2>User Management</h2>

      <input
        type="text"
        placeholder="User ID"
        value={form.id}
        onChange={(e) => setForm({ ...form, id: e.target.value })}
      />
      {errors.id && <p className="error">{errors.id}</p>}

      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <input
        type="text"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <button className="primary-btn" onClick={addUser}>
        Add User
      </button>
    </div>

    {/* RIGHT PANEL */}
    <div className="right-panel">

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => setSelectedUser(user)}
                >
                  View
                </button>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* MODAL */}
    {selectedUser && (
      <div className="modal">
        <div className="modal-box">
          <h2>User Details</h2>
          <p><strong>ID:</strong> {selectedUser.id}</p>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <button
            className="primary-btn"
            onClick={() => setSelectedUser(null)}
          >
            Close
          </button>
        </div>
      </div>
    )}
  </div>
  );
}

export default UserManagement;