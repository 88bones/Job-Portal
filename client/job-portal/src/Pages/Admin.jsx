import React from "react";
import "../Css/Admin.css";
import SideBar from "../Components/SideBar";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <div className="admin-dashboard ">
        <SideBar />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;
