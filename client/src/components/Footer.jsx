import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 pt-20 pb-10 bg-black text-gray-300">

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* LEFT */}
        <div>
          <img src={assets.logo} alt="" className="w-40 mb-4" />

          <p className="text-sm leading-6 max-w-sm">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book.
          </p>

          {/* App Buttons */}
          <div className="flex items-center gap-4 mt-6">
            <img src={assets.googlePlay} className="h-10 cursor-pointer" />
            <img src={assets.appStore} className="h-10 cursor-pointer" />
          </div>
        </div>

        {/* COMPANY */}
        <div>
          <p className="text-white font-medium mb-4">Company</p>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About us</li>
            <li className="hover:text-white cursor-pointer">Contact us</li>
            <li className="hover:text-white cursor-pointer">Privacy policy</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <p className="text-white font-medium mb-4">Get in touch</p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>+1-212-456-7890</li>
            <li>contact@example.com</li>
          </ul>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        Copyright 2024 Â© Company name. All Right Reserved.
      </div>

    </div>
  );
};

export default Footer;

