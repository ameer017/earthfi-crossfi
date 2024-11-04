import React from "react";
import Union from "../assets/Union.png";

const Create = () => {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4 my-9">
      <div className="flex flex-col items-start">
        <div>
          <h2 className="text-3xl md:text-[2.5rem] leading-tight font-medium text-gray-800 mb-2">
            Turn Plastic into Impact! 🌍
          </h2>

          <p className="text-base md:text-lg  md:w-3/4">
            Submit your order now and be part of the movement driving change
            through recycling. Let&apos;s make a sustainable future possible
            together!
          </p>
        </div>

        <img
          src={Union}
          alt="Union"
          className="mt-4 opacity-75 w-full max-w-xs md:max-w-lg"
          loading="lazy"
        />
      </div>

      <div className="mt-8 md:mt-0">
        <div className="bg-white p-6 rounded-2xl border border-[#E3F3E6]">
          <h5 className="text-base font-semibold mb-4 text-center">
            Enter Order Details
          </h5>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg mb-2 font-medium">Title</label>
                <input
                  type="text"
                  placeholder="title"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-lg mb-2 font-medium">
                  Weight(KG){" "}
                </label>
                <input
                  type="text"
                  placeholder="00.00"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg mb-2 font-medium">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="add location"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-lg mb-2 font-medium">Amount</label>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg mb-2 font-medium">
                Upload image
              </label>
              <input
                type="file"
                placeholder="upload img"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>

            <div className="mt-4">
              <button className="w-full sm:w-[15vw] bg-[#F5A624] text-white py-3 rounded-lg hover:bg-[#e69816] transition-colors">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
