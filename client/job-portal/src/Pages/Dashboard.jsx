import React, { useEffect } from "react";
import "../Css/Admin.css";
import UserSideBar from "../Components/UserSideBar";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = ({ fullname, loggedIn }) => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigate("/");
  //   }
  // }, [loggedIn, navigate]);

  return (
    <>
      <div className="dashboard-container">
        <UserSideBar fullname={fullname} />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
