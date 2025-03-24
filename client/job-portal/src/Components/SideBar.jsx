import React from "react";
import "../Css/SideBar.css";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const barItems = [
    { name: "Users", path: "/admin/users" },
    { name: "Companies", path: "/admin/companies" },
    { name: "Jobs", path: "" },
    { name: "Something", path: "" },
  ];
  return (
    <div className="side-bar-container">
      <h1>アドミニストレータ</h1>
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

export default SideBar;
