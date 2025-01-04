import React, { useEffect, useState } from "react";
import { client } from "../../prismicio"; // Adjust the path as needed
import { PrismicRichText } from "@prismicio/react";
import lightImg from "../../assets/images/svg/light.svg";
import targetImg from "../../assets/images/svg/target.svg";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#ff7e84] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await client.getSingle("about_sectionn"); // Replace with your Custom Type ID
      setAboutData(response.data);
    };
    fetchData();
  }, []);

  if (!aboutData) {
    return <LoadingSpinner />;
  }

  return (
    <section className="min-h-screen container mx-auto p-8 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
      
      {aboutData.image && (
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={aboutData.image.url}
            alt={aboutData.image.alt || "About Image"}
            className="max-w-full h-auto rounded-md "
          />
        </div>
      )}

      {/* Right: Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-8">
        {/* Titles */}
        <h1 className="text-xl font-bold text-[#30ccd7]">
          <PrismicRichText field={aboutData.title_1} />
        </h1>
        <h2 className="text-5xl font-semibold text-gray-700">
          <PrismicRichText field={aboutData.title_2} />
        </h2>
        <p className="text-lg font-light leading-relaxed text-gray-500">
          <PrismicRichText field={aboutData.description_1} />
        </p>

        {/* Icon + Description 1 */}
        <div className="flex items-center space-x-4">
          <div className="h-[72px] w-[72px] rounded-full">
            <img
              src={lightImg}
              alt="lightImg"
              className="w-full h-full object-cover rounded-full block"
            />
          </div>
          <div>
            <h3 className="text-2xl font-medium text-gray-600">
              <PrismicRichText field={aboutData.title_3} />
            </h3>
            <p className="text-lg font-light leading-relaxed text-gray-500">
              <PrismicRichText field={aboutData.description_2} />
            </p>
          </div>
        </div>

        {/* Icon + Description 2 */}
        <div className="flex items-center space-x-4">
          <div className="h-[72px] w-[72px] rounded-full">
            <img
              src={targetImg}
              alt="Target Icon"
              className="w-full h-full object-cover rounded-full block"
            />
          </div>
          <div>
            <h4 className="text-2xl font-medium text-gray-600">
              <PrismicRichText field={aboutData.title_4} />
            </h4>
            <p className="text-lg font-light leading-relaxed text-gray-500">
              <PrismicRichText field={aboutData.description_3} />
            </p>
          </div>
        </div>

        {/* Button */}
        <button className="px-6 py-3 bg-[#ff7e84] w-full md:w-auto text-white font-semibold rounded-md shadow-md hover:bg-gray-400 transition">
          {aboutData.read_more_button}
        </button>
      </div>
    </section>
  );
};

export default About;
