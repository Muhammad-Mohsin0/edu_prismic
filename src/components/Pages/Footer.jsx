import React, { useEffect, useState } from "react";
import { client } from "../../prismicio"; // Adjust the path as needed
import { PrismicRichText } from "@prismicio/react";
import { RiFacebookFill } from "react-icons/ri";
import { IoLogoTwitter } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";


const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#ff7e84] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await client.getSingle("footer_section"); // Replace with your Custom Type ID
      setFooterData(response.data);
    };
    fetchData();
  }, []);

  if (!footerData) {
    return <LoadingSpinner />;
  }

  return (
    <div
    className="bg-cover bg-no-repeat bg-center py-24"
    style={{ backgroundImage: `url(${footerData.background_image?.url})` }}
  >
    <div className="container mx-auto px-6 sm:px-10 lg:px-32 text-white grid grid-cols-1 sm:grid-cols-4 gap-8">
      {/* Left Section: Logo and Description */}
      <div className="space-y-6">
        <img
          src={footerData.logo_image?.url}
          alt="Logo"
          className="w-20 h-auto"
        />
        <div className="text-gray-400 leading-loose text-lg">
          <PrismicRichText field={footerData.description_1} />
        </div>
        <div className="flex space-x-4 text-4xl">
          <RiFacebookFill className="bg-blue-500 text-white p-2 rounded-lg" />
          <IoLogoTwitter className="bg-sky-500 text-white p-2 rounded-lg" />
          <FaLinkedinIn className="bg-blue-600 text-white p-2 rounded-lg" />
          <AiFillInstagram className="bg-pink-500 text-white p-2 rounded-lg" />
        </div>
      </div>
  
      {/* Center Section: Links */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Links</h2>
        <ul className="space-y-3 text-gray-400 leading-relaxed text-lg">
          <li>Home</li>
          <li>Pricing</li>
          <li>Courses</li>
          <li>Contact Us</li>
          <li>Blog</li>
        </ul>
      </div>
  
      {/* Center-Right Section: Legal */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Legal</h2>
        <ul className="space-y-3 text-gray-400 leading-relaxed text-lg">
          <li>Terms of Use</li>
          <li>Team & Conditions</li>
          <li>Payment Methods</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
  
      {/* Right Section: Newsletter */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          <PrismicRichText field={footerData.news_title} />
        </h2>
        <div className="text-gray-400 mb-4 leading-loose text-lg">
          <PrismicRichText field={footerData.description_2} />
        </div>
        <div>
          <input
            type="email"
            placeholder={footerData.email?.placeholder || "Enter your mail"}
            className="w-full p-3 rounded-md mb-4 text-gray-800"
          />
          <button className="bg-[#ff7e84] text-white py-3 px-6 rounded-md w-full">
            {footerData.Subscribe_button || "Subscribe Now"}
          </button>
        </div>
      </div>
    </div>
  
    {/* Copyright Section */}
    <div className="text-center text-gray-400 mt-24 pt-4 border-t border-gray-600 bottom-0">
      <PrismicRichText field={footerData.copy_right} />
    </div>
  </div>
  
  
  
  );
};

export default Footer;
