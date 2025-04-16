import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../Css/Profile.css";

const Profile = () => {
  const options = [
    { name: "Register as a candidate", path: "/register" },
    { name: "Register as a recruiter", path: "/recruiter" },
  ];

  return (
    <div className="profile-container">
      <div className="profile-options">
        <ul type="none">
          {options.map((option, index) => (
            <li key={index}>
              <NavLink to={option.path}>{option.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
