import React from "react";
import Banner from "../Components/Banner.jsx";
import NavBar from "../Components/NavBar.jsx";
import Cards from "../Components/Cards.jsx";
import JobListings from "../Components/JobListings.jsx";
import RecommendedJobs from "../Components/RecommendedJobs.jsx";
import { useSelector } from "react-redux";

const Home = ({ isOver, setIsOver, isNoti, setIsNoti }) => {
  const { role, loggedIn } = useSelector((state) => state.user);

  return (
    <div>
      <NavBar
        isOver={isOver}
        setIsOver={setIsOver}
        isNoti={isNoti}
        setIsNoti={setIsNoti}
      />
      <Banner isOver={isOver} isNoti={isNoti} />
      <Cards />

      {loggedIn ? (
        role === "recuiter" ? (
          <JobListings />
        ) : (
          <>
            <RecommendedJobs />
            <JobListings />
          </>
        )
      ) : (
        <JobListings />
      )}
    </div>
  );
};

export default Home;
