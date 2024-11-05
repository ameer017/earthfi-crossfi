import React from "react";

const Token = () => {
  return (
    <div
      className="pt-[111px] pl-[43px]"
      style={{
        background: "linear-gradient(to bottom, rgba(162, 248, 205, 0.2), rgba(162, 248, 205, 0.1), #FFFFFF)",
      }}
    >
      <div className="relative mx-auto flex flex-col md:flex-row gap-10 items-center">
    
        <div className="relative w-[224px] md:w-5/12 flex flex-col items-center md:items-start text-center md:text-left ">
          <div className="relative w-[646.52px] h-[290.59] overflow-hidden rounded-tl-[100px] rounded-br-[100px] clip-path-mycircle">
            <img
              src="../../public/Images/Union.svg"
              alt="union"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="-mt-6">
            <h2 className="text-[32px] leading-[38.4px] font-normal mb-[16px] text-[#292929]">
              Gain with ethics
            </h2>
            <p className="w-[417px] text-[16px] leading-[19.2px] font-sans font-normal mb-[20px] text-[#525252]">
              EarthFi Coin incentivizes its certified entities to be truthful in
              their reporting and operations. Recovery entities go through a
              strict verification process, and are constantly under audit to
              provide transparent information. Ready to invest in transparency?
            </p>
            <button className="bg-[#F29F05] mb-[102px] text-[16px] text-white py-2 px-4 mt-6 rounded-lg hover:-translate-y-1 hover:bg-orange-200 transition-all duration-300 ease-in-out">
              Get your token
            </button>
          </div>
        </div>

   
        <div className="w-[499px] gap-16 mb-[135px] pl-[160px]">
          <div className="-ml-[160px] mb-[140px]">
            <div className="">
              <h3 className="text-[32px] leading-[38.4px] font-normal mb-[16px] text-[#292929]">
                Let's talk utility
              </h3>
              <p className="w-[499px] text-[16px] leading-[19.2px] font-sans font-normal text-[#525252]">
                This is not about hype, it's about utility. The EarthFi Coin
                ensures <br /> transparent plastic recovery, funding our certified
                entities worldwide to clean the environment.
              </p>
            </div>
          </div>

          <div className="-ml-[21.21px] mb-[133px]">
            <div className="mb-[200px]">
              <h3 className="text-[32px] leading-[38.4px] font-normal mb-[16px] text-[#292929] whitespace-nowrap">
                Transparency as a lifestyle
              </h3>
              <p className="w-[350px] text-[16px] leading-[19.2px] font-sans font-normal text-[#525252]">
                This is not about hype, it's about utility. The EarthFi Coin
                ensures transparent plastic recovery, funding our certified
                entities worldwide to clean the environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Token;