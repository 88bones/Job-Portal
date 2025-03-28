import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import account from "../Images/account.svg";
import "../Css/NavBar.css";
import Profile from "../Pages/Profile";

const NavBar = ({ isOver, setIsOver }) => {
  const MenuItems = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/Jobs" },
    { name: "About Us", path: "/Aboutus" },
    { name: "Admin ", path: "/Admin" },
  ];

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
            <button className="login-btn"> Login</button>
            <button onClick={() => setIsOver(!isOver)}>Register</button>
          </div>
        </header>
      </nav>
    </>
  );
};

export default NavBar;
