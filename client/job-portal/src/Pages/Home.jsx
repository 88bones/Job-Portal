import React from "react";
import Banner from "../Components/Banner.jsx";
import NavBar from "../Components/NavBar.jsx";
import Cards from "../Components/Cards.jsx";
import JobListings from "../Components/JobListings.jsx";

const Home = ({
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
    <div>
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
      <Banner isOver={isOver} />
      <Cards />
      <JobListings />
    </div>
  );
};

export default Home;
