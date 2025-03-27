import React from "react";
import Banner from "../Components/Banner.jsx";
import NavBar from "../Components/NavBar.jsx";
import Cards from "../Components/Cards.jsx";

const Home = ({ isOver, setIsOver }) => {
  return (
    <div>
      <NavBar isOver={isOver} setIsOver={setIsOver} />
      <Banner isOver={isOver} />
      <Cards />
    </div>
  );
};

export default Home;
