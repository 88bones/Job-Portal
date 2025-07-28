import React from "react";
import Account from "../Images/account.svg";
import { NavLink, useNavigate } from "react-router-dom";
import "../Css/NavBar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const NavBar = ({ isOver, setIsOver }) => {
  const MenuItems = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/Jobs" },
    { name: "About Us", path: "/Aboutus" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { fullname, role, loggedIn } = useSelector((state) => state.user);

  if (loggedIn && role === "admin") {
    MenuItems.push({ name: "Admin", path: "/Admin" });
  }

  const handleLogOut = () => {
    dispatch(logout()); // clears Redux state and localStorage inside userSlice
    navigate("/");
  };

  return (
    <nav className="navbar">
      <header>
        <h1 className="site-name">JobPortal</h1>
        <div className="menu-items">
          <ul>
            {MenuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
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
              <img src={Account} width="20px" alt="account icon" />
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
                <NavLink to={"/login"}>Login</NavLink>
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
  );
};

export default NavBar;
