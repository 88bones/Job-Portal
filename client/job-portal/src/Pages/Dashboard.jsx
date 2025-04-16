import React from "react";
import "../Css/Admin.css";
import UserSideBar from "../Components/UserSideBar";
import { Outlet } from "react-router-dom";

const Dashboard = ({ fullname }) => {
  return (
    <div className="dashboard-container">
      <UserSideBar fullname={fullname} />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
