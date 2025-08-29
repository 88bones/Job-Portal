import React, { useEffect } from "react";
import "../Css/Admin.css";
import UserSideBar from "../Components/UserSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { fullname, loggedIn, role } = useSelector((state) => state.user);

  return (
    <>
      {loggedIn ? (
        <div className="dashboard-container">
          <UserSideBar fullname={fullname} role={role} loggedIn={loggedIn} />
          <div className="dashboard-content">
            <Outlet />
          </div>
        </div>
      ) : (
        "Login required"
      )}
    </>
  );
};

export default Dashboard;
