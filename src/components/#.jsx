import React, { useEffect, useState } from "react";
import { client } from "../prismicio"; // Adjust path as needed
import { PrismicRichText } from "@prismicio/react";

const Hero = () => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await client.getSingle("hero_section"); // Replace with your Custom Type ID
      setHeroData(response.data);
    };
    fetchData();
  }, []);

  if (!heroData) return <p>Loading...</p>;

  return (
    <section className="relative min-h-screen flex items-center justify-end bg-gray-700">
      {/* Text Content */}
      <div className="hero-text w-1/2 pr-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-400">
          <PrismicRichText field={heroData.title} />
        </h1>
        <h2 className="text-2xl font-semibold mb-4">
          <PrismicRichText field={heroData.name} />
        </h2>
        <p className="text-lg leading-relaxed text-gray-400 pr-12">
          <PrismicRichText field={heroData.description} />
        </p>
        <button className="mt-6 px-6 py-3 bg-black text-gray-600 font-semibold rounded-md shadow-md hover:bg-gray-400 transition">
          Show More
        </button>
      </div>

      {/* Image */}
      <div className="bg-black rounded-l-3xl shadow-2xl  ">

      <div className="hero-image w-3/5 ">
        <img
          src={heroData.image.url}
          alt={heroData.image.alt}
          className="w-full h-auto pl-12 "
          />
      </div>
          </div>
    </section>
  );
};

export default Hero;
