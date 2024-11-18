import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const loadPage = () => {
    navigate("/get-started");
  };

  return (
    <section
      className="flex items-center justify-center p-6 h-[85vh] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(240, 255, 240, 0.8), rgba(255, 255, 255, 0.2)), url('/herobg.png')",
        backgroundSize: "contain",
      }}
    >
      <div className="w-full max-w-[90%] md:max-w-[60%] lg:max-w-[50%] p-4 text-center md:text-left">
        <h1 className="text-[32px] md:text-[48px] font-medium text-[#292929] font-ubuntu">
          Welcome to EarthFi
        </h1>

        <p className="mt-4 text-[16px] md:text-[18px] md:text-[#525252] ">
          Together, let's create a world where sustainability thrives.
        </p>

        <button
          className="bg-[#F29F05] text-[16px] text-white py-2 px-4 mt-6 rounded-lg hover:-translate-y-1 hover:bg-orange-200 transition-all duration-300 ease-in-out"
          onClick={loadPage}
        >
          Explore Solutions
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
