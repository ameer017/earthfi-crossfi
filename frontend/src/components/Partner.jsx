import React from "react";

const partnerMedia = [
  { id: 1, image: "https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { id: 2, image: "https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 3, image: "https://images.pexels.com/photos/303058/pexels-photo-303058.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 4, image: "https://images.pexels.com/photos/28957936/pexels-photo-28957936/free-photo-of-close-up-of-car-front-grill-with-striking-design.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

const Partner = () => {
  return (
    <section className="w-full p-6 text-center my-[90px] flex flex-col">
      <h1 className="text-[#292929] text-[30px] md:text-[40px] font-ubuntu pb-[100px] md:pb-[146px]">
        Our <span className="text-[#F29F05]">Partners</span> and{" "}
        <span className="text-[#F29F05]">clients</span>
      </h1>

      <div className="overflow-hidden w-full">
        <div className="flex gap-8 items-center animate-slide">
          {partnerMedia.map(({ id, image }) => (
            <img
              key={id}
              src={image}
              alt={`Partner ${id}`}
              className="w-[200px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partner;
