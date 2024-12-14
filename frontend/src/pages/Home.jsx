import {
  Ecology,
  Footer,
  Header,
  HeroSection,
  Impact,
  Partner,
} from "../index";

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
