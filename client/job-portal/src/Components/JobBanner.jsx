import React from "react";
import Profile from "../Pages/Profile";
import "../Css/JobBanner.css";

const JobBanner = ({ isOver }) => {
  return (
    <>
      <div className="job-banner-main-container">
        <div className="job-profile-ontainer">
          {isOver == true ? (
            <div>
              <Profile />
              {console.log("hello mate")}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="job-banner-container"></div>
      </div>
    </>
  );
};

export default JobBanner;
