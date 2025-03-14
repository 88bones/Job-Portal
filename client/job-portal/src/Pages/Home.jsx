import React, { useState } from "react";
import Banner from "../Components/Banner.jsx";
import NavBar from "../Components/NavBar.jsx";
import Cards from "../Components/Cards.jsx";
import "../Css/Home.css";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [isOver, setIsOver] = useState(false);
  return (
    <div>
      <NavBar isOver={isOver} setIsOver={setIsOver} />
      <Banner isOver={isOver} setIsOver={setIsOver} />
      <Cards />
    </div>
  );
};

export default Home;
