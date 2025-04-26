import React from "react";
import NavBar from "../Components/NavBar";
import JobBanner from "../Components/JobBanner";
import JobListings from "../Components/JobListings";

const Jobs = ({
  isOver,
  setIsOver,
  fullname,
  setFullname,
  role,
  setRole,
  loggedIn,
  setIsLoggedIn,
}) => {
  return (
    <div className="jobs-main-container">
      <NavBar
        isOver={isOver}
        setIsOver={setIsOver}
        fullname={fullname}
        setFullname={setFullname}
        setRole={setRole}
        role={role}
        loggedIn={loggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <JobBanner isOver={isOver} />
      <JobListings />
    </div>
  );
};

export default Jobs;
