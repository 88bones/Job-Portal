import React, { useState } from "react";
import Profile from "../Pages/Profile";
import "../Css/JobBanner.css";

const JobBanner = ({ isOver }) => {
  const [selectedFilter, setSelectedFilter] = useState();
  const [selectedIndustry, setSelectedIndustry] = useState();

  return (
    <>
      <div className="job-banner-main-container">
        <div className="job-profile-ontainer">
          {isOver == true ? (
            <div>
              <Profile />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="job-banner-container">
          <div className="filters">
            <div className="filter-container">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="time-dropdown-content"
              >
                <option value="all">All Jobs</option>
                <option value="newset">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="nearest-deadline">Nearest Deadline</option>
              </select>
            </div>
            <div className="industry-filter">
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                <option value="all">All Industry</option>
                <option value="it">IT</option>
                <option value="mgm">Management</option>
                <option value="er">Engineering</option>
                <option value="med">Medical</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobBanner;
