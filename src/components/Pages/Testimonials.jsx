import React, { useEffect, useState } from "react";
import { client } from "../../prismicio"; // Adjust the path as needed
import { PrismicRichText } from "@prismicio/react";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#ff7e84] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Testimonials = () => {
  const [testimonialsData, setTestimonialsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await client.getSingle("testimonials_section"); // Replace with your Custom Type ID
      setTestimonialsData(response.data);
    };
    fetchData();
  }, []);

  if (!testimonialsData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative">
      {/* Stats Section */}
      <div
        className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[10px] bg-white shadow-lg rounded-md
          divide-x-2 divide-[#E4EEED] py-10 top-12 relative z-10 mx-auto"
        style={{
           // Pushes stats section further upward
          maxWidth: "1100px", // Reduces the width
        }}
      >
        <div className="text-center">
          <h2 className="text-teal-400 text-5xl font-bold mb-2">
            <span className="counter">82</span>K+
          </h2>
          <span className="block text-gray-600  font-semibold text-2xl">
            Enrolled Students
          </span>
        </div>
        <div className="text-center">
          <h2 className="text-teal-400 text-5xl font-bold mb-2">
            <span className="counter">348</span>+
          </h2>
          <span className="block text-gray-600 font-semibold text-2xl">
            Academic Programs
          </span>
        </div>
        <div className="text-center">
          <h2 className="text-teal-400 text-5xl font-bold mb-2">
            <span className="counter">125</span>+
          </h2>
          <span className="block text-gray-600  font-semibold text-2xl">
            Winning Awards
          </span>
        </div>
        <div className="text-center">
          <h2 className="text-teal-400 text-5xl font-bold mb-2">
            <span className="counter">37</span>+
          </h2>
          <span className="block text-gray-600  font-semibold text-2xl">
            Certified Students
          </span>
        </div>
      </div>

      {/* Testimonials Section */}
      <section
        className="container h-screen bg-cover bg-no-repeat bg-center mx-auto flex flex-col items-center justify-center overflow-hidden p-8 space-y-12"
        style={{
          backgroundImage: `url(${testimonialsData.background_image?.url})`,
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-evenly space-y-8 md:space-y-0 md:space-x-8 w-full">
          {/* Image on the Left */}
          {testimonialsData.image && (
            <div className="w-full md:w-2/5 flex justify-center">
              <img
                src={testimonialsData.image.url}
                alt={testimonialsData.image.alt || "Testimonial Image"}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          )}

          {/* Text Content on the Right */}
          <div className="w-full md:w-2/5 space-y-4 text-center md:text-left">
            <h1 className="text-2xl font-bold text-[#30ccd7]">
              <PrismicRichText field={testimonialsData.title_1} />
            </h1>
            <h2 className="text-6xl font-semibold text-gray-700">
              <PrismicRichText field={testimonialsData.title_2} />
            </h2>
            <p className="text-lg font-light leading-relaxed text-gray-500 mt-14">
              <PrismicRichText field={testimonialsData.description} />
            </p>
            {testimonialsData.view_all_reviews_button && (
              <div>
                <button className="px-6 py-3 bg-[#ff7e84] text-white font-semibold rounded-md shadow-md hover:bg-gray-400 transition">
                  {testimonialsData.view_all_reviews_button}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
