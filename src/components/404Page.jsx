import React, { useEffect, useState } from "react";
import { PrismicRichText } from "@prismicio/react";
import { client } from "../prismicio"; // Prismic client import
import error404 from "../assets/images/all-img/404.svg"; // Ensure correct import for image

// Loading spinner component
const LoadingSpinner = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    aria-label="Loading"
  >
    <div className="w-12 h-12 border-4 border-[#ff7e84] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const NotFoundPage = () => {
  const [data, setData] = useState(null); // State for fetched data
  const [error, setError] = useState(false); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Prismic
        const document = await client.getSingle("404_section");
        setData(document?.data); // Set data
      } catch (err) {
        console.error("Error fetching data:", err); // Log error
        setError(true); // Set error state
      }
    };

    fetchData();
  }, []);

  // Show loading spinner while fetching data
  if (!data && !error) {
    return <LoadingSpinner />;
  }

  // Show error message if data fetch fails
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading data. Please try again later.
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-black px-4"
      style={{
        backgroundImage: `url(${data?.background_image?.url})`, // Background image
      }}
    >
      {/* Error Image */}
      <div>
        <img src={error404} alt="404 Error" className="mb-6" />
      </div>

      {/* Title */}
      <h1 className="text-6xl font-extrabold my-6 text-[#4c4c4c]">
        <PrismicRichText field={data?.title} />
      </h1>

      {/* Description */}
      <div className="text-lg text-gray-500 md:text-xl mb-8 text-center font-semibold max-w-2xl">
        <PrismicRichText field={data?.description} />
      </div>

      {/* Back to Home Button */}
      <button
        className="mt-6 text-lg bg-[#ff7e84] hover:bg-red-500 text-white font-medium py-6 px-10 rounded-lg shadow-lg transition duration-300"
        onClick={() => (window.location.href = "/")} // Redirect to home page
      >
        {data?.back_to_home || "Go Back Home"}
      </button>
    </div>
  );
};

export default NotFoundPage;
