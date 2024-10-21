import React from "react";

const HeroSection = () => {
  return (
    <div
      className="h-[85vh] flex items-center p-6 "
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(240, 255, 240, 0.8), rgba(255, 255, 255, 0.2)), url('/herobg.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        height: "85vh",
      }}
    >
      <div className="ml-[89px] p-2 w-2/4 ">
        <h1 className="text-[48px] font-[500] text-[#292929] font-ubuntu ">
          Welcome to EarthFi
        </h1>
        <p className="font-[400] text-[18px] text-[#525252] ">
          Together, let's create a world where sustainability thrives.
        </p>

        <button className="bg-[#F29F05] text-[16px] text-[#fff] p-[10px] rounded-lg mt-6">
          Explore Solutions
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
