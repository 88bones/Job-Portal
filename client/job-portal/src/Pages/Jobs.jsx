import React from "react";
import NavBar from "../Components/NavBar";
import JobBanner from "../Components/JobBanner";
import JobListings from "../Components/JobListings";
import { useState } from "react";

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
  const [selectedFilter, setSelectedFilter] = useState();
  const [selectedIndustry, setSelectedIndustry] = useState();
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
      <JobBanner
        isOver={isOver}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
      />
      <JobListings
        selectedFilter={selectedFilter}
        selectedIndustry={selectedIndustry}
      />
    </div>
  );
};

export default Jobs;
