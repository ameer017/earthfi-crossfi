import React from "react";

const partnerMedia = [
  { id: 1, image: "/planet3r.png" },
  { id: 2, image: "/greenhill.png" },
  { id: 3, image: "/bierge.png" },
  { id: 4, image: "/alhalaal.png" },
];

const Partner = () => {
  return (
    <section className="w-full p-6 text-center my-[90px] flex flex-col">
      <h1 className="text-[#292929] text-[30px] md:text-[40px] font-ubuntu pb-[50px] ">
        Our <span className="text-[#F29F05]">Partners</span> and{" "}
        <span className="text-[#F29F05]">clients</span>
      </h1>

      <div className="overflow-hidden w-full">
        <div className="flex gap-10 items-center animate-slide">
          {partnerMedia.map(({ id, image }) => (
            <img
              key={id}
              src={image}
              alt={`Partner ${id}`}
              className="w-[150px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partner;
