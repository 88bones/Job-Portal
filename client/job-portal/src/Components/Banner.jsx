import React from "react";
import Profile from "../Pages/Profile";
import NavBar from "./NavBar";
import "../Css/Banner.css";

const Banner = ({ isOver }) => {
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
        </div>
        <div className="banner-container">
          <div className="banner-sub">
            <h1>Discover Jobs That Fit Your Skills & Passion.</h1>
            <p>Browse thousands of job listings from top companies.</p>
            <div className="job-params">
              <input type="text" placeholder="Job Title..." />
              <select>
                <option value="">City</option>
                <option value="">City</option>
              </select>
              <select name="" id="">
                <option value="">Category</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
