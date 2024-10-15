import React from "react";
import HeroSection from "../components/HeroSection";
import Impact from "../components/Impact";
import Partner from "../components/Partner";
import Ecology from "../components/Ecology";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Ecology />
      <Impact />
      <Partner />
    </div>
  );
};

export default Home;
