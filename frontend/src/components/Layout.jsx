import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: "85vh" }}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
