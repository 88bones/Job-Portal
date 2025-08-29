import React, { useEffect } from "react";
import "../Css/Admin.css";
import SideBar from "../Components/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Admin = () => {
  const { loggedIn, role } = useSelector((state) => state.user);

  return (
    <>
      {loggedIn && role === "admin" ? (
        <div className="admin-dashboard ">
          <SideBar />
          <div className="admin-content">
            <Outlet />
          </div>
        </div>
      ) : (
        "users CANNOT access"
      )}
    </>
  );
};

export default Admin;
