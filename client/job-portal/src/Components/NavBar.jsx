import React, { useEffect, useState } from "react";
import Account from "../Images/account.svg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Css/NavBar.css";

const NavBar = ({
  isOver,
  setIsOver,
  fullname,
  role,
  loggedIn,
  setIsLoggedIn,
}) => {
  const MenuItems = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/Jobs" },
    { name: "About Us", path: "/Aboutus" },
  ];

  if (loggedIn && role === "admin") {
    MenuItems.push({ name: "Admin", path: "/Admin" });
  }

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    localStorage.removeItem("fullname");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

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
            {loggedIn && fullname && (
              <span className="fullname-disp">
                <img src={Account} width="20px"></img>
                <NavLink to={"/dashboard"}>{fullname}</NavLink>
              </span>
            )}

            {loggedIn ? (
              <button className="logout-btn" onClick={handleLogOut}>
                LogOut
              </button>
            ) : (
              <>
                <button className="login-btn">
                  <NavLink to={"/login"}> Login</NavLink>
                </button>
                <button
                  onClick={() => setIsOver(!isOver)}
                  style={{ background: "var(--button)" }}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </header>
      </nav>
    </>
  );
};

export default NavBar;
