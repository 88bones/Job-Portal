import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../Css/SideBar.css";
import { useSelector } from "react-redux";

const UserSideBar = () => {
  const { fullname, loggedIn, role } = useSelector((state) => state.user);

  const barItems = [];

  loggedIn &&
    barItems.push({ name: "Profile", path: "/dashboard/updateUsers" });

  if (loggedIn && role === "recruiter") {
    barItems.push(
      { name: "Create Jobs", path: "/dashboard/createJobs" },
      { name: "Created Jobs", path: "/dashboard/createdJobs" },
      { name: "Applications", path: "" }
    );
  } else if (loggedIn && role === "user") {
    barItems.push({ name: "Applied Jobs", path: "/dashboard/appliedJobs" });
  }

  return (
    <div className="side-bar-container">
      {/* <h1>アドミニストレータ</h1> */}
      <h1>{fullname}</h1>
      <div className="bar-menu">
        {barItems.map((items, index) => (
          <div className="bar-items" key={index}>
            <NavLink to={items.path}>{items.name}</NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSideBar;
