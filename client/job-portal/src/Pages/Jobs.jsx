import React from "react";
import NavBar from "../Components/NavBar";
import JobBanner from "../Components/JobBanner";
import JobListings from "../Components/JobListings";
import { useState } from "react";
import { useSelector } from "react-redux";

const Jobs = ({ isOver, setIsOver, setIsNoti, isNoti }) => {
  const [selectedFilter, setSelectedFilter] = useState();
  const [selectedIndustry, setSelectedIndustry] = useState();
  const { _id, fullname, role, loggedIn } = useSelector((state) => state.user);

  return (
    <div className="jobs-main-container">
      <NavBar
        isOver={isOver}
        setIsOver={setIsOver}
        isNoti={isNoti}
        setIsNoti={setIsNoti}
      />
      <JobBanner
        isOver={isOver}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        isNoti={isNoti}
      />
      <JobListings
        selectedFilter={selectedFilter}
        selectedIndustry={selectedIndustry}
        isNoti={isNoti}
      />
    </div>
  );
};

export default Jobs;
