import React, { useEffect } from "react";
import "../Css/Admin.css";
import UserSideBar from "../Components/UserSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = ({ isSelected, setIsSelected }) => {
  const { fullname, loggedIn, role } = useSelector((state) => state.user);

  return (
    <>
      <div className="dashboard-container">
        <UserSideBar
          fullname={fullname}
          role={role}
          loggedIn={loggedIn}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
        />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
