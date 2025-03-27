import React from "react";
import NavBar from "../Components/NavBar";

const Jobs = ({ isOver, setIsOver }) => {
  return (
    <div className="jobs-main-container">
      <NavBar isOver={isOver} />
    </div>
  );
};

export default Jobs;
