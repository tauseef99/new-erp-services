import React from "react";
//import SellerNavbar from "../components/common/SellerNavbar";
import SellerNavbar from "../.././Components/seller/SellerNavbar";

const SellerLayout = ({ children }) => {
  return (
    <div>
      <SellerNavbar />
      <main style={{ padding: "20px" }}>{children}</main>
    </div>
  );
};

export default SellerLayout;
