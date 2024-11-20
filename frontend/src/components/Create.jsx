import React, { useState } from "react";
import Union from "../assets/Union.png";

import { toast } from "react-toastify";
import useCreateOrder from "../hooks/useCreateOrder";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const createOrder = useCreateOrder();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();
  const handleInputClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };
  

  const handleCreateOrder = async () => {
    if (!title || !weight || !location || !amount || files.length === 0) {
      toast.error("Please fill all fields and upload required files.");
      return;
    }

    setIsUploading(true);
    try {
      await createOrder(title, weight, location, amount, files);
      // navigate("/market-place");
      alert("Order created successfully");
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleYes = async () => {
    setIsModalOpen(false);
  };

  const handleNo = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4 my-9">
      <div className="flex flex-col items-start">
        <div>
          <h2 className="text-3xl md:text-[2.5rem] leading-tight font-medium text-gray-800 mb-2">
            Turn Plastic into Impact!{" "}
            <span className="inline-block animate-spin-slow">🌍</span>
          </h2>

          <p className="text-base md:text-lg  md:w-3/4">
            Submit your order now and be part of the movement driving change
            through recycling. Let&apos;s make a sustainable future possible
            together!
          </p>
        </div>

        <div className=" w-full flex items-center justify-center md:block">
          <img
            src={Union}
            alt="Union"
            className="mt-4 opacity-75 md:max-w-lg"
            loading="lazy"
          />
        </div>
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg mb-2 font-medium">
                  Weight(KG)
                </label>
                <input
                  type="text"
                  placeholder="00.00"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
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
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg mb-2 font-medium">Amount</label>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-lg mb-2 font-medium">
                Upload Files
              </label>
              <input
                type="file"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                multiple
                onChange={handleFileChange}
                onClick={handleInputClick}
              />
            </div>

            <div className="mt-4">
              <button
                className={`w-full sm:w-[15vw] ${
                  isUploading ? "bg-gray-400" : "bg-[#F5A624]"
                } text-white py-3 rounded-lg hover:bg-[#e69816] transition-colors `}
                onClick={handleCreateOrder}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h2 className="text-lg font-bold mb-4">
              Requirements [1 video and 2 images]{" "}
            </h2>
            <p className="mb-4">
              The following files are expected to be uploaded:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>A recorded video of the asset being weighed</li>
              <li>Image of the asset before and after being weighed</li>
            </ul>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleNo}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                No
              </button>
              <button
                onClick={handleYes}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
