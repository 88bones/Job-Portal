import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../Css/NavBar.css";

const NavBar = ({ isOver, setIsOver }) => {
  // const [role, setRole] = useState(null);

  const MenuItems = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/Jobs" },
    { name: "About Us", path: "/Aboutus" },
    { name: "Admin", path: "/Admin" },
  ];

  //   ...(role === "admin" ? [{ name: "Admin", path: "/Admin" }] : []),
  // ];

  // useEffect(() => {
  //   try {
  //     const storedUser = localStorage.getItem("user");
  //     if (storedUser) {
  //       const userData = JSON.parse(storedUser);
  //       setRole(userData.role);
  //       console.log(user.fullname);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }, []);

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
