import React from "react";
import SideBar from "../SiderBar/sideBar";
import NavBar from "../Navbar/navBar";
import Footer from "../Footer/Footer";
import ProductsBrandsCarrousel from "../carrousel/ProductsBrandsCaroussel";

export const LayoutWithNavBarAndFooter:React.FC <({ children:React.ReactNode})> = ({children}) => (
  <div className="flex flex-col h-screen">
    <NavBar />
    <div className="flex flex-grow">
      <SideBar />
      <div className="flex-grow flex justify-center">
        {children}
      </div>
    </div>
    <ProductsBrandsCarrousel/>
    <Footer />
  </div>
);

export const LayoutWithoutNavBarAndFooter:React.FC <({ children:React.ReactNode})> = ({children}) => (
  <div className="">
    <div className="">
      <div className="">
        {children}
      </div>
    </div>
  </div>
);


export const LayoutWithNavBar:React.FC <({ children:React.ReactNode})> = ({children}) => (
  <div className="">
    <NavBar />
    <div className="">
      <div className="">
        {children}
      </div>
    </div>
    <Footer />
  </div>
);