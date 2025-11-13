import React from "react";
import BuyerNavbar from "../../Components/buyer/BuyerNavbar";

const BuyerLayout = ({ children }) => {
  return (
    <div>
      <BuyerNavbar />
      <main style={{ padding: "20px" }}>{children}</main>
    </div>
  );
};

export default BuyerLayout;
