import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAsset } from "../context/assetContext";

const assets = [
  {
    id: 1,
    title: "Voyatouch",
    location: "Apt 421",
    price: 2003,
    weight: 1,
    description: "A high-quality product suitable for various uses.",
    img: "/orderImage.png",
    imgTwo: "/earth.png",
    vid: "/vid.mp4",
  },
  {
    id: 2,
    title: "Holdlamis",
    location: "Suite 89",
    price: 2006,
    weight: 2,
    description: "Premium material designed for modern applications.",
    img: "/orderImage.png",
    imgTwo: "/earth.png",
    vid: "/vid.mp4",
  },
  {
    id: 3,
    title: "Tampflex",
    location: "PO Box 26955",
    price: 1998,
    weight: 3,
    description: "Durable and reliable product for all your needs.",
    img: "/orderImage.png",
    imgTwo: "/earth.png",
    vid: "/vid.mp4",
  },
];

const SingleOrder = () => {
  const { id } = useParams();
  const asset = assets.find((asset) => asset.id === parseInt(id));
   

  if (!asset) {
    return <p>Asset not found.</p>;
  }

  const { title, location, price, weight, description, img, imgTwo, vid } =
    asset;

  return (
    <section className="p-6 lg:p-12 h-full ">
      <div className="bg-gradient-to-r from-green-200 via-green-400 to-white p-8 rounded-lg text-center mb-10">
        <h1 className="text-4xl lg:text-6xl font-bold text-black ">{title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col items-center">
          <img
            src={img}
            alt={title}
            className="w-full h-72 object-cover rounded-lg mb-4"
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4">Product Details</h2>
          <p className="text-gray-700 text-lg mb-4">
            <strong>Location:</strong> {location}
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>Price:</strong> ${price}
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>Weight:</strong> {weight} kg
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>Description:</strong> {description}
          </p>

          <div className="mt-8">
            <button className="bg-green-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition duration-300">
              Order Now
            </button>
          </div>
        </div>

        {/* <div className="block ">
          <hr />
          <div className="flex  p-4 items-center flex-col md:flex-row">
            <img src={imgTwo} className="w-1/2 rounded-md" />

            <video src={vid} controls className="w-1/2 rounded-md"></video>
          </div>
        </div> */}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/market-place"
          className="text-blue-600 hover:text-blue-800 underline text-lg"
        >
          ← Back to Marketplace
        </Link>
      </div>
    </section>
  );
};

export default SingleOrder;
