import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaInfo } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { RiShoppingCartLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdCreateNewFolder } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const liquidVariants = {
    initial: {
      clipPath: "circle(0% at 0% 50%)",
      opacity: 0,
    },
    animate: {
      clipPath: "circle(150% at 0% 50%)",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 15,
      },
    },
    exit: {
      clipPath: "circle(0% at 0% 50%)",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const menuItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    }),
  };

  return (
    <header className="w-full h-20 flex justify-between items-center px-4  bg-green-50 shadow-md fixed top-0 left-0 z-30">
      <div>
        <Link to="/">
          <img src="/EarthFi.png" alt="EarthFi Logo" className="w-[120px]" />
        </Link>
      </div>

      <nav className="hidden md:flex justify-between items-center">
        <Link to="/create-order" className="px-4 text-[16px]">
          Create Order
        </Link>
        <Link to="/token" className="px-4 text-[16px]">
          EarthFI
        </Link>
        <Link to="/market-place" className="px-4 text-[16px]">
          Market Place
        </Link>
        <appkit-button size="md" />
      </nav>

      <button
        onClick={toggleMenu}
        className="text-3xl md:hidden focus:outline-none z-40"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-screen bg-gradient-to-r from-teal-900 to-stone-400 text-white flex flex-col items-center justify-center"
            variants={liquidVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <nav className="flex flex-col items-center space-y-6">
              <Link
                to="/about-us"
                className="text-[16px] "
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/create-order"
                className="text-[16px]"
                onClick={toggleMenu}
              >
                Create Order
              </Link>
              <Link to="/token" className="text-[16px] " onClick={toggleMenu}>
                EarthFI
              </Link>
              <Link
                to="/market-place"
                className="text-[16px] "
                onClick={toggleMenu}
              >
                Market Place
              </Link>
              <Link to="/profile" className="text-[16px] " onClick={toggleMenu}>
                Profile
              </Link>
              <Link
                to="/team-members"
                className="text-[16px] "
                onClick={toggleMenu}
              >
                Team
              </Link>

              <motion.div
                variants={menuItemVariants}
                initial="initial"
                animate="animate"
                custom={4}
              >
                <appkit-button size="md" />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
