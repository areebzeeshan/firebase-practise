import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <section>
        <Navbar />
      </section>
      <div className="w-[90%] mx-auto my-10">{children}</div>
    </div>
  );
};

export default Layout;
