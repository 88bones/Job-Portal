import React, { useEffect } from "react";
import "../Css/Admin.css";
import UserSideBar from "../Components/UserSideBar";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = ({ fullname, loggedIn, role, setIsLoggedIn }) => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigate("/");
  //   }
  // }, [loggedIn, navigate]);

  useEffect(() => {
    setIsLoggedIn(true);
  });

  return (
    <>
      <div className="dashboard-container">
        <UserSideBar fullname={fullname} role={role} loggedIn={loggedIn} />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
