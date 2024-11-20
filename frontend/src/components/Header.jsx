import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="w-full border-b-2 p-6 flex justify-between items-center">
      <div>
        <Link to="/">
          <img src="/EarthFi.png" alt="EarthFi Logo" className="w-[120px]" />
        </Link>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <nav className="hidden md:flex justify-between items-center ">
        {/* <Link to="/about-us" className="px-4 text-[16px]">
          About
        </Link> */}
        <Link to="/create-order" className="px-4 text-[16px]">
          Create Order
        </Link>
        {/* <Link to="/token" className="px-4 text-[16px]">
          EarthFI
        </Link> */}
        <Link to="/market-place" className="px-4 text-[16px]">
          Market Place
        </Link>
        <Link to="/profile" className="px-4 text-[16px]">
          Profile
        </Link>
        {/* <Link to="/team-members" className="px-4 text-[16px]">
          Team
        </Link> */}
        {/* <button className="bg-[#F29F05] text-[16px] text-white py-2 px-4 rounded-lg hover:bg-orange-200 transition-all duration-300 ease-in-out">
          Connect Wallet
        </button> */}
        <appkit-button />
      </nav>

      {menuOpen && (
        <nav className="absolute top-16 right-0 w-full bg-white flex flex-col items-end p-6 space-y-4 md:hidden z-10 ">
          <div className="flex flex-col">
            <Link
              to="/about-us"
              className="text-[16px] my-4 border-b-[1px] "
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/create-order"
              className="text-[16px] my-4 border-b-[1px] "
              onClick={toggleMenu}
            >
              Create Order
            </Link>
            <Link to="/token" className="text-[16px] my-4 border-b-[1px] " onClick={toggleMenu}>
              EarthFI
            </Link>

            <Link
              to="/market-place"
              className="text-[16px] my-4 border-b-[1px] "
              onClick={toggleMenu}
            >
              Market Place
            </Link>
            <Link
              to="/profile"
              className="text-[16px] my-4 border-b-[1px] "
              onClick={toggleMenu}
            >
              Profile
            </Link>
            <Link
              to="/team-members"
              className="text-[16px] my-4 border-b-[1px] "
              onClick={toggleMenu}
            >
              Team
            </Link>
            <div onClick={toggleMenu}>
              <appkit-button />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
