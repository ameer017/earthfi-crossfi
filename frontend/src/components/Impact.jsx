import React, { useState, useEffect } from "react";

const media = [
  "/world.jpg",
  "/pexelsOne.jpg",
  "/pexelsTwo.jpg",
  "/pexelsThree.jpg",
];

const Impact = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeState, setFadeState] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % media.length);
        setFadeState(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" px-4 py-2 flex items-center justify-center  gap-[12rem]  ">
      <div className="flex flex-col gap-2 p-4">
        <div className=" border-2 border-[#006546] p-6 rounded-lg bg-white w-[390px] h-[209px] flex flex-col  items-center justify-center">
          <h1 className="text-[28px] ">Environmental Impact</h1>

          <ul className="text-[16px] mt-3  text-[#7C7C7C] ">
            <li>Improved Recycling Infrastructure.</li>
            <li>New recycling points.</li>
            <li>Greater recovery and recycling capabilities.</li>
            <li>Cleaner environment.</li>
          </ul>
        </div>

        <div className="p-6 rounded-lg bg-[#006546] text-white ml-[18rem] w-[390px] h-[209px] flex flex-col  items-center justify-center -mt-[40px] ">
          <h1 className="text-[28px] ">Social Impact</h1>

          <ul className="text-[16px] mt-3 text-[#fff] ">
            <li>Dignified working opportunities.</li>
            <li>Empowerment of individuals in the workforce.</li>
            <li>Education and workshops.</li>
          </ul>
        </div>

        <div className="border-2 border-[#006546] p-6 rounded-lg bg-white w-[390px] h-[209px] flex flex-col  items-center justify-center -mt-[40px]">
          <h1 className="text-[28px] ">Community Impact</h1>

          <ul className="text-[16px] mt-3 text-[#7C7C7C] ">
            <li>Achieve sustainability goals.</li>
            <li>Easily showcase impact.</li>
            <li>Attract new customers.</li>
            <li>New source of revenue.</li>
          </ul>
        </div>
      </div>
      <div className="w-[396px] border-[1.4rem] rounded-lg">
        <div
          className={`w-full h-auto transition-opacity duration-500  rounded-lg ${
            fadeState ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={media[currentImageIndex]} />
        </div>
      </div>
    </div>
  );
};

export default Impact;
