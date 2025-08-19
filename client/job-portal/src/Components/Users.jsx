import React, { useEffect, useState } from "react";
import "../Css/Users.css";
import axios from "axios";
import { deleteUser } from "../services/deleteUser";

const Users = () => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/getUsers")
      .then((response) => {
        setListOfUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const filteredUsers = selectedRole
    ? listOfUsers.filter((user) => user.role === selectedRole)
    : listOfUsers;

  //delete user
  const handleDelete = async (id, role) => {
    const result = await deleteUser(id, role);

    if (result.error) {
      setSuccess(result.error);
    } else {
      setSuccess(result.message);
      setListOfUsers((prev) => prev.filter((u) => u._id !== id));
    }
  };

  return (
    <div className="users-container">
      <header className="user-header">Users</header>
      <div className="filter-container">
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>FullName</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>{user._id}</td>
              <td className="action">
                <button onClick={() => handleDelete(user._id, user.role)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <span style={{ color: "green" }}>{success}</span>
    </div>
  );
};

export default Users;
