import "./config/connection";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  About,
  Contact,
  Create,
  GetStarted,
  MarketPlace,
  Service,
  SingleOrder,
  Team,
  Layout,
  ScrollToTop,
  Token,
  Advisor,
  Profile,
} from "./index";

import { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { useAppKitAccount } from "@reown/appkit/react";
import { TxnContextProvider } from "./context/txnContext";

function App() {
  const [loading, setLoading] = useState(true);
  const { address } = useAppKitAccount();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const loadRoutes = () => {
    return (
      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <div className="h-screen w-full flex justify-center items-center">
                <PropagateLoader
                  color="#2d7343"
                  loading={loading}
                  size={8}
                  speedMultiplier={1}
                />
              </div>
            ) : (
              <Home />
            )
          }
        />
        <Route
          path="/about-us"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/create-order"
          element={
            <Layout>
              <Create />
            </Layout>
          }
        />
        <Route
          path="/get-started"
          element={
            <Layout>
              <GetStarted />
            </Layout>
          }
        />
        <Route
          path="/market-place"
          element={
            <Layout>
              <MarketPlace />
            </Layout>
          }
        />
        <Route
          path="/what-we-do"
          element={
            <Layout>
              <Service />
            </Layout>
          }
        />
        <Route
          path="/order/:id"
          element={
            <Layout>
              <SingleOrder />
            </Layout>
          }
        />
        <Route
          path="/team-members"
          element={
            <Layout>
              <Team />
            </Layout>
          }
        />
        <Route
          path="/advisor"
          element={
            <Layout>
              <Advisor />
            </Layout>
          }
        />

        <Route
          path="/token"
          element={
            <Layout>
              <Token />
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout>
              <Service />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <TxnContextProvider>
              <Layout>
                <Profile address={address} />
              </Layout>
            </TxnContextProvider>
          }
        />
      </Routes>
    );
  };
  return (
    <>
      <ScrollToTop />
      {loadRoutes()}
    </>
  );
}

export default App;
