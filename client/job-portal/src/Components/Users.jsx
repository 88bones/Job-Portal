import React, { useEffect, useState } from "react";
import "../Css/Users.css";
import axios from "axios";

const Users = () => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

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
              <td className="action">
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
