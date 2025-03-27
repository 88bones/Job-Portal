import React from "react";
import NavBar from "../Components/NavBar";
import JobBanner from "../Components/JobBanner";

const Jobs = ({ isOver, setIsOver }) => {
  return (
    <div className="jobs-main-container">
      <NavBar isOver={isOver} setIsOver={setIsOver} />
      <JobBanner isOver={isOver} />
    </div>
  );
};

export default Jobs;
