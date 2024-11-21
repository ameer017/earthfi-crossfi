import React from "react";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="flex flex-col border-t-2">
      <div className="flex flex-wrap justify-between p-6 mt-8 space-y-6 md:space-y-0 md:flex-nowrap md:mb-[180px] ">
        <div className="w-full md:w-1/3 lg:w-[519px] md:mr-10 ">
          <Link to="/">
            <img src="/EarthFi.png" className="w-40 h-auto md:w-auto" />
          </Link>
          <p className="text-[16px] mt-4 md:my-[10px]">
            We leverage blockchain technology to revolutionize waste collection,
            recycling, and disposal services. Our decentralized structure is to
            ensure transparent, efficient, and environmentally responsible waste
            management practices.
          </p>
        </div>

        <div className="md:px-4 flex flex-col items-left space-y-2 ">
          <h2 className="text-[20px] md:text-[25px] font-semibold">Company</h2>
          <Link
            className="text-[16px] hover:-translate-y-2 transition duration-300 ease-in-out"
            to="/about-us"
          >
            About Us
          </Link>
          <Link
            className="text-[16px] hover:-translate-y-2 transition duration-300 ease-in-out"
            to="/advisor"
          >
            Advisor
          </Link>
          <Link
            className="text-[16px] hover:-translate-y-2 transition duration-300 ease-in-out"
            to="/contact-us"
          >
            Contact Us
          </Link>
          {/* <Link
            className="text-[16px] hover:-translate-y-2 transition duration-300 ease-in-out"
            to="/services"
          >
            Services
          </Link> */}
          <Link
            className="text-[16px] hover:-translate-y-2 transition duration-300 ease-in-out"
            to="/team-members"
          >
            Team
          </Link>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-left space-y-2">
          <h2 className="text-[20px] md:text-[25px] font-semibold">Socials</h2>
          <div className="flex items-center gap-4 text-[18px] text-green-700">
            <a
              href="https://x.com/EarthFi"
              className="border-[1px] rounded-full p-2 border-green-700"
            >
              <FaXTwitter />
            </a>
            <a
              href="mailto:team@earthfi.xyz"
              className="border-[1px] rounded-full p-2 border-green-700"
            >
              <HiOutlineMail />
            </a>
          </div>
        </div>
      </div>

      <div className="relative mt-20 ">
        <img
          src="/curve.png"
          alt="Footer Curve"
          className="absolute bottom-0 left-0 w-full"
          style={{ zIndex: -1 }}
        />
      </div>
    </footer>
  );
};

export default Footer;
