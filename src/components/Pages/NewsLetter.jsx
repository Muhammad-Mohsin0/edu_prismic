import React, { useEffect, useState } from "react";
import { client } from "../../prismicio"; // Adjust path as needed
import { PrismicRichText } from "@prismicio/react";
import mailWhite from "../../assets/images/svg/mail-white.svg";
import bigMail from "../../assets/images/svg/big-mail.svg";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#ff7e84] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const NewsLetter = () => {
  const [newsletterData, setNewsletterData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await client.getSingle("newsletter_section"); // Replace with your Custom Type ID
      setNewsletterData(response.data);
    };
    fetchData();
  }, []);

  if (!newsletterData) {
    return <LoadingSpinner />;
  }

  return (
    <section
      className="container mx-auto flex flex-col items-center justify-center bg-cover bg-no-repeat bg-center px-4 py-10"
      style={{
        backgroundImage: `url(${newsletterData.background_image?.url})`,
      }}
    >
      {/* Title Section */}
      <div className="flex items-center space-x-4 mb-14">
        <img src={bigMail} alt="Big Mail" className="w-12 h-12 md:w-16 md:h-16" />
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          <PrismicRichText field={newsletterData.title} />
        </h1>
      </div>

      {/* Email Input Section */}
      <div className="w-full md:w-1/2 flex-1">
        <div className="md:flex items-center relative md:space-x-6 md:space-y-0 space-y-4">
          {/* Email Input */}
          <div className="flex-1 relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 pb-2">
              <img src={mailWhite} alt="Mail Icon" />
            </span>
            <input
              type="email"
              placeholder={newsletterData.email}
              className="w-full border-b border-t-0 border-l-0 border-r-0 border-[#B2E2DF] ring-0 focus:ring-0 bg-transparent text-white
                         placeholder:text-[#B2E2DF] focus:outline-0 focus:border-[#B2E2DF] transition pl-6 pb-2 text-lg"
            />
          </div>

          {/* Button */}
          <div className="flex-none">
            <button className="px-10 py-4 rounded-lg text-teal-400 bg-white text-lg font-semibold md:w-auto w-full">
              {newsletterData.get_started_button}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
