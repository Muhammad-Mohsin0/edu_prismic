import React, { useEffect, useState } from "react";
import { client } from "../prismicio"; // Adjust path as needed
import { PrismicRichText } from "@prismicio/react";

const AboutSection = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await client.getSingle("about_section"); // Replace with your Custom Type ID
      setAboutData(response.data);
    };
    fetchData();
  }, []);

  if (!aboutData) return <p>Loading...</p>;

  return (
    <section className="min-h-screen flex items-center justify-start ">
      {/* Left Side: Image */}
      <div className=" w-1/2">

      <div className="about-image ">
        <img
          src={aboutData.aboutimg.url}
          alt={aboutData.aboutimg.alt}
          className="w-full h-auto rounded-r-3xl "
          />
      </div>
          </div>

      {/* Right Side: Text */}
      <div className="about-text w-1/2 px-12">
        <h1 className="text-4xl font-bold mb-4 text-black">
          <PrismicRichText field={aboutData.abouttitle} />
        </h1>
        <p className="text-lg leading-relaxed text-gray-700 mb-4">
          <PrismicRichText field={aboutData.description} />
        </p>
        <button className="mt-6 px-6 py-3 bg-pink-300 text-white font-semibold rounded-md shadow-md hover:bg-gray-300 transition">
          Get Start
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
