import { React, useState } from "react";
import Profile from "../Pages/Profile";

import "../Css/Banner.css";
import Notifications from "../Pages/Notifications";
import { useNavigate } from "react-router-dom";

const Banner = ({ isOver, isNoti }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <>
      <div className="banner-main-container">
        <div className="profile-ontainer">
          {isOver == true ? (
            <div>
              <Profile />
              {/* {console.log("hello mate")} */}
            </div>
          ) : (
            ""
          )}
          {isNoti == true ? (
            <div>
              <Notifications />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="banner-container">
          <div className="banner-sub">
            <h1>
              Discover <span class="highlight-job">Jobs</span> That Fit Your
              Skills & Passion.
            </h1>
            <p>Browse thousands of job listings from top companies.</p>
            <div className="job-params">
              <input
                type="text"
                placeholder="Job Title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
