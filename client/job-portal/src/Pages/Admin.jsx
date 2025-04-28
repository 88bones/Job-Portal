import React, { useEffect } from "react";
import "../Css/Admin.css";
import SideBar from "../Components/SideBar";
import { Outlet, useNavigate } from "react-router-dom";

const Admin = ({ loggedIn }) => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <>
      {loggedIn && (
        <div className="admin-dashboard ">
          <SideBar />
          <div className="admin-content">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
