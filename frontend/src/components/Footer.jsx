import React from "react";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className=" flex flex-col  border-t-2">
      <div className="flex justify-between p-6  mt-[33px] ">
        <div className="w-[519px] ">
          <Link to="/">
            <img src="/EarthFi.png" />
          </Link>

          <p className="text-[16px] my-[10px] ">
            We leverage blockchain technology to revolutionize waste collection,
            recycling, and disposal services. Our decentralized structure is to
            ensure transparent, efficient, and environmentally responsible waste
            management practices.
          </p>
        </div>

        <div className="flex flex-col items-left">
          <h2 className="text-[25px] ">Company</h2>

          <Link className="text-[16px] hover:-translate-y-2 transition duration-300 ease-in-out" to="/advisors">
            Advisor
          </Link>
          <Link className="text-[16px] hover:-translate-y-2 transition duration-300 ease-in-out " to="/about-us">
            About Us
          </Link>
          <Link className="text-[16px] hover:-translate-y-2 transition duration-300 ease-in-out " to="/contact-us">
            Contact Us
          </Link>
          <Link className="text-[16px] hover:-translate-y-2 transition duration-300 ease-in-out " to="/services">
            Services
          </Link>
          <Link className="text-[16px] hover:-translate-y-2 transition duration-300 ease-in-out " to="/team">
            Team
          </Link>
        </div>

        <div className="flex flex-col items-left">
          <h2 className="text-[25px] ">Socials</h2>

          <div className="flex  items-center gap-4 text-[18px] text-green-700 ">
            <a href="">
              <FaXTwitter />
            </a>
            <a href="mailto:team@earthfi.xyz">
              <HiOutlineMail />
            </a>
          </div>
        </div>
      </div>

      <div className=" mt-6">
      <svg xmlns="http://www.w3.org/2000/svg" width="1439" height="254" viewBox="0 0 1439 254" fill="none">
  <path d="M-1 0C-1 0 230.778 103.346 385.791 137C792.857 225.377 1439 0 1439 0V254H-1V0Z" fill="#002F22"/>
</svg>
      </div>
    </footer>
  );
};

export default Footer;
