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
} from "./index";

import Token from "./components/Token";

import ScrollToTop from "./components/ScrollToTop";


function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
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
          path="/token"
          element={
            <Layout>
              <Token />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
