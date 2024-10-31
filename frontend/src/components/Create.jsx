import React from "react";
import Union from "../assets/Union.png";

const Create = () => {
  return (
    <div className="p-8 flex gap-4 mt-9"> {/* Reduced gap between sections */}
      {/* Left section */}
      <div className="w-[45%] flex flex-col items-start"> {/* Reduced width */}
        <h2 className="text-[2.5rem] leading-tight font-medium text-gray-800 mb-2">
          Horem ipsum dolor sit amet, <br /> consectetur <br /> adipiscing elit.
        </h2>

        {/* Reduced top margin to bring image closer to the title */}
        <img src={Union} alt="Union" className="mt-1 opacity-75" />
      </div>

      {/* Right section */}
      <div className="w-[45%] mt-[4rem]">
        <div className="bg-white p-6 rounded-2xl border border-[#E3F3E6]">
          <h5 className="text-base font-semibold mb-4">Enter Order Details</h5>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-lg mb-2 font-medium"> {/* Adjusted font size */}
                  Title
                </label>
                <input
                  type="text"
                  placeholder="title"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>

              <div className="flex-1">
                <label className="block text-lg mb-2 font-medium">
                  Weight
                </label>
                <input
                  type="number"
                  placeholder="00.00"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-lg mb-2 font-medium">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="add location"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>

              <div className="flex-1">
                <label className="block text-lg mb-2 font-medium">
                  Amount
                </label>
                <input
                  type="number"
                  placeholder="$0.00"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg mb-2 font-medium">
                Upload image
              </label>
              <input
                type="text"
                placeholder="upload img"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>

            <div className="mt-4">
              <button className="w-[15vw] bg-[#F5A624] text-white py-3 rounded-lg hover:bg-[#e69816] transition-colors">
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
