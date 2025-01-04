import React, { useEffect, useState } from "react";
import { client } from "../../prismicio"; // Adjust the path as needed
import { PrismicRichText } from "@prismicio/react";
import { FaRegHandshake } from "react-icons/fa6";
import { SlGlobe } from "react-icons/sl";
import { PiChalkboardTeacherLight } from "react-icons/pi";




const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#ff7e84] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

const Feature = () => {
  const [featureData, setFeatureData] = useState(null);

  const iconMap = [SlGlobe, PiChalkboardTeacherLight, FaRegHandshake];


  useEffect(() => {
    const fetchData = async () => {
      const response = await client.getSingle("core_features"); // Replace with your Custom Type ID
      setFeatureData(response.data);
    };
    fetchData();
  }, []);

  if (!featureData) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${featureData.background_image.url})`,
      }}
    >
        <div className="container">
        <div className="text-center">
          <div className="font-semibold text-lg text-[#30ccd7] mb-4">
            <PrismicRichText field={featureData.main_title_1} />
          </div>
          <div className="text-5xl font-bold">
            <PrismicRichText field={featureData.main_title_2} />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] pt-20 mx-32">
          {[1, 2, 3].map((index) => {
            const IconComponent = iconMap[index - 1]; // Select the icon dynamically
            return (
              <div
                key={index}
                className="bg-white shadow-box rounded-[8px] p-10 group hover:bg-[#ff7e84] transition duration-150 hover:-translate-y-1"
              >
                <div
                  className="h-[72px] w-[72px] rounded-full flex flex-col items-center justify-center text-secondary bg-[#e9fbfa] mb-8
                    text-5xl text-teal-500 group-hover:bg-black group-hover:bg-opacity-[0.1] group-hover:text-white transition duration-150 "
                >
                  <IconComponent />
                </div>
                <h4 className="lg:text-2xl font-bold text-[22px] leading-[30px] mb-4 transition duration-150 group-hover:text-white">
                  <PrismicRichText
                    field={featureData[`card_${index}_title`]}
                  />
                </h4>
                <div className="transition duration-150 group-hover:text-white text-lg leading-[30px] font-light text-gray-600">
                  <PrismicRichText
                    field={featureData[`card_${index}_description`]}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
  );
};

export default Feature;
