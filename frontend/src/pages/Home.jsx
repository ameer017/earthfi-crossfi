import HeroSection from "../components/HeroSection";
import Impact from "../components/Impact";
import Partner from "../components/Partner";
import Ecology from "../components/Ecology";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col ">
        <HeroSection />

        <div className=" border-t-2 p-4 bg-gradient-to-b from-green-50 to-white ">
          <Ecology />
          <Impact />
        </div>

        <Partner />
      </div>
      <Footer />
    </>
  );
};

export default Home;
