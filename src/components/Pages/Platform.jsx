import React, { useEffect, useState } from "react";
import { client } from "../../prismicio"; // Adjust path as needed
import { PrismicRichText } from "@prismicio/react";
import ok from "../../assets/images/svg/ok.svg";


const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#ff7e84] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Platform = () => {
  const [platformData, setPlatformData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await client.getSingle("platform_section");
      setPlatformData(response.data);
    };
    fetchData();
  }, []);

  if (!platformData) {
    return <LoadingSpinner />;
  }

  return (
    <section
      className="container mx-auto flex flex-col md:flex-row items-center justify-between bg-cover bg-no-repeat bg-center px-4"
      style={{
        backgroundImage: `url(${platformData.background_image?.url})`,
      }}
    >
      {/* Text Content */}
      <div className="md:w-1/3 md:ml-auto md:pr-10 space-y-8 md:pt-20 md:pb-20 pt-14 pb-10">
        {/* Main Title 1 */}
        <div className="font-semibold text-lg text-[#30ccd7]">
          <PrismicRichText field={platformData.main_title_1} />
        </div>
        {/* Main Title 2 */}
        <h1 className="text-4xl  font-bold text-gray-800">
          <PrismicRichText field={platformData.main_title_2} />
        </h1>
        {/* Description */}
        <p className="text-xl font-light leading-8 text-gray-600">
          <PrismicRichText field={platformData.description} />
        </p>
        {/* Mini Titles */}
        <div className="space-y-4">
        <div className="flex ">
              <img src={ok} alt=""  />  
          <h3 className="text-xl font-semibold text-gray-700 ml-4">
            <PrismicRichText field={platformData.mini_title_1} />
          </h3>
          </div>
          <div className="flex ">   
            <img src={ok} alt="" />
          <h3 className="text-xl font-semibold text-gray-700 ml-4  ">
            <PrismicRichText field={platformData.mini_title_2} />
          </h3>
          </div>
          <div className="flex ">
             <img src={ok} alt="" />
          <h3 className="text-xl font-semibold text-gray-700 ml-4">
            <PrismicRichText field={platformData.mini_title_3} />
          </h3>
          </div>
        </div>
        {/* Button */}
        <button className="px-6 py-3 bg-[#ff7e84] text-lg text-white font-semibold rounded-md shadow-md hover:bg-gray-400 transition">
          {platformData.explore_our_course}
        </button>
      </div>

      {/* Image */}
      <div className="md:w-1/2 flex justify-start mt-8 md:mt-0">
        {platformData.image && (
          <img
            src={platformData.image.url}
            alt={platformData.image.alt || "Platform Image"}
            className="w-full max-w-md md:max-w-lg h-auto"
          />
        )}
      </div>
    </section>
  );
};

export default Platform;
