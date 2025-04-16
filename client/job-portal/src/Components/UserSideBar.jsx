import React from "react";
import { NavLink } from "react-router-dom";
import "../Css/SideBar.css";

const UserSideBar = ({ fullname }) => {
  const barItems = [
    { name: "Profile", path: "" },
    { name: "Applied Jobs", path: "" },
    { name: "Applications", path: "" },
    { name: "Create Jobs", path: "/dashboard/createjobs" },
  ];
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
