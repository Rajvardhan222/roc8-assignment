import { NavbarData } from "@/utils/navBarData";
import Image from "next/image";
import React from "react";

function Navbar() {

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-end py-2 items-center">
        <div className="flex gap-x-6 items-center mr-10 ">
          <div>Help</div>
          <div>Orders & Returns</div>
          <div>Hi, John</div>
        </div>
      </div>
      <div className="flex justify-between items-center mx-8 py-3" >
        <div className="font-bold text-3xl">ECOMMERCE</div>
        <div className="flex items-center gap-x-8">
            {
                NavbarData.map((nav,index) => (
                    <div key={index} className="font-semibold"> {nav} </div>
                ))
            }
        </div>
        <div className="flex items-center gap-x-8">
            <Image src="/icons/search.svg" alt="search"  width={20} height={20} />
            <Image src="/icons/cart.svg" alt="cart" width={20} height={20} />
        </div>
      </div>
      <div className="bg-[#F4F4F4] py-3 flex justify-center items-center">
        <div className="font-medium text-sm">
        Get 10% off on business sign up    
        </div>
      </div>
    </div>
  );
}

export default Navbar;
