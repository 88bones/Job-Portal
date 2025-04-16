import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../Css/NavBar.css";

const NavBar = ({ isOver, setIsOver, fullname, role }) => {
  const MenuItems = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/Jobs" },
    { name: "About Us", path: "/Aboutus" },
    // { name: "Admin", path: "/Admin" },
  ];

  if (role === "admin") {
    MenuItems.push({ name: "Admin", path: "/Admin" });
  }

  return (
    <>
      <nav className="navbar">
        <header>
          <h1 className="site-name">JobPortal</h1>
          <div className="menu-items">
            <ul>
              {MenuItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="account-centre">
            {fullname && (
              <span>
                <NavLink to={"/dashboard"}>{fullname}</NavLink>
              </span>
            )}

            <button className="login-btn">
              <NavLink to={"/login"}> Login</NavLink>
            </button>
            <button onClick={() => setIsOver(!isOver)}>Register</button>
          </div>
        </header>
      </nav>
    </>
  );
};

export default NavBar;
