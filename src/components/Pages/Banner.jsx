import React, { useEffect, useState } from "react";
import { client } from "../../prismicio"; // Adjust path as needed
import { PrismicRichText } from "@prismicio/react";
import mailIcon from "../../assets/images/icon/mail.svg";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#ff7e84] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Banner = () => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await client.getSingle("banner_section"); // Replace with your Custom Type ID
      setHeroData(response.data);
    };
    fetchData();
  }, []);

  if (!heroData) {
    return <LoadingSpinner />;
  }

  return (
    <section className=" container bg-cover bg-no-repeat bg-center mx-auto flex items-center justify-center overflow-hidden" style={{
      backgroundImage: `url(${heroData.background_image?.url})`,
    }}>
      {/* Text Content */}
      
      <div className="max-w-[570px] lg:pt-[297px] md:pt-20 md:pb-20 pt-28 pb-14 lg:pb-40 space-y-8 md:ml-32">
        {/* Title */}
        <h1 className="text-7xl  font-bold mb-4 text-gray-800">
          <PrismicRichText field={heroData.title} />
        </h1>
        
        {/* Description */}
        <p className="text-xl leading-9 font-normal text-gray-400 pr-12">
             <PrismicRichText field={heroData.description} />
        </p>
        {/* Email Input */}
        <div className="md:flex items-center mt-6 px-4 py-4 bg-white rounded-md  "> 
        <div className="flex-none">
                <span className=" ">
                  <img src={mailIcon} alt="mainIcon" />
                </span>
              </div>
        <div className="flex-1">
          <input
            type="email"
            placeholder={heroData.email}
            className="w-full px-6 py-4 text-gray-800 focus:outline-none "
            />
        </div>

        {/* Get Started Button */}

        <button className=" px-6 py-3 bg-[#ff7e84] w-full md:w-auto  text-white font-semibold rounded-md shadow-md hover:bg-gray-400 transition">
          {heroData.get_started_button}
        </button>
      </div>
     </div>

      {/* Image */}
     
        <div className=" w-[60%] xl:right-[-260px] hidden xl:block ">
          {heroData.image && (
            <img
              src={heroData.image.url}
              alt={heroData.image.alt || "Hero Image"}
              className="h-auto w-full mt-32"
            />
          )}
        </div>
    
    </section>
  );
};

export default Banner;
