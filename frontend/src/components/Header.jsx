import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full border-b-2 p-6 flex justify-between items-center">
      <div>
      <Link to="/">

        <img src="/EarthFi.png"/>
      </Link>
      </div>

      <nav className="  flex justify-between items-center">
        <Link to="/about-us" className="px-4 text-[16px] ">About</Link>
        {/* <Link to="/about" className="px-4 text-[16px] ">EarthFi</Link> */}
        <Link to="/create-order" className="px-4 text-[16px] ">Create Order</Link>
        <Link to="/market-place" className="px-4 text-[16px] ">Market Place</Link>

        <button className="bg-[#F29F05] text-[16px] text-[#fff] p-[10px] rounded-lg hover:-translate-y-1 hover:bg-orange-200 hover:transition-all transition-duration-300 ease-in-out ">Connect Wallet</button>
      </nav>
    </header>
  );
};

export default Header;
