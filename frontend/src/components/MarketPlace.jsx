import React, { useState } from "react";
import { Link } from "react-router-dom";

const assets = [
  {
    id: 1,
    title: "Voyatouch",
    location: "Apt 421",
    price: 2003,
    weight: 1,
    img: "/orderImage.png",
  },
  {
    id: 2,
    title: "Holdlamis",
    location: "Suite 89",
    price: 2006,
    weight: 2,
    img: "/orderImage.png",
  },
  {
    id: 3,
    title: "Tampflex",
    location: "PO Box 26955",
    price: 1998,
    weight: 3,
    img: "/orderImage.png",
  },
];

const MarketPlace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredAssets = assets.filter(
    ({ title, location }) =>
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssets = filteredAssets.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <section className="p-6">
      <h1 className="text-[48px] text-center mb-6">Market Place.</h1>

      <div className="flex justify-center py-4">
        <div className="w-full max-w-lg">
          <input
            type="search"
            placeholder="Search asset by name or location"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 gap-6">
        {currentAssets.length > 0 ? (
          currentAssets.map(({ id, title, location, price, weight, img }) => (
            <Link
              to={`/order/${id}`}
              key={id}
              className="border-2 px-5 py-[3rem] rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl bg-white"
            >
              <img src={img} className="w-full mb-2  " />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {" "}
                Title: {title}
              </h2>

              <p className="text-lg font-semibold text-green-600">
                Amount: {price} CELO
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Seller&apos;s Location: {location}
              </p>
              <p className="text-lg text-gray-500">Weight: {weight} kg</p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No assets found.</p>
        )}
      </div>

      <div className="flex justify-center items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>

        <span className="text-lg mx-4">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default MarketPlace;
