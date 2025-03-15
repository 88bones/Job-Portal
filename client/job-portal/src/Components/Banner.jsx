import React from "react";
import Profile from "../Pages/Profile";
import "../Css/Banner.css";

const Banner = ({ isOver, setisOver }) => {
  return (
    <>
      <div className="banner-main-container">
        <div
          className="profile-ontainer"
          onMouseOver={() => setisOver(true)}
          onMouseOut={() => setisOver(false)}
        >
          {isOver == true ? (
            <div>
              <Profile />
              {console.log("hello mate")}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="banner-container">
          <div className="banner-sub">
            <h2>Find a job to start your career!!!</h2>
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
