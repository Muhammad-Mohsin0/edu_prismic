import React, { useEffect, useState } from "react";
import { client } from "../../prismicio"; // Adjust the path as needed
import { PrismicRichText } from "@prismicio/react";
import admin from "../../assets/images/svg/admin.svg";
import calender from "../../assets/images/svg/calender.svg";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#ff7e84] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Blogs = () => {
  const [blogsData, setBlogsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await client.getSingle("blogs_section"); // Replace with your Custom Type ID
      setBlogsData(response.data);
    };
    fetchData();
  }, []);

  if (!blogsData) {
    return <LoadingSpinner />;
  }

  const renderBlogs = () => {
    const blogs = [];
    for (let i = 1; i <= 3; i++) {
      blogs.push({
        image: blogsData[`blog_${i}_image`]?.url,
        type: blogsData[`blog_${i}_type`],
        position: blogsData[`blog_${i}_position`],
        date: blogsData[`blog_${i}_date`],
        title: blogsData[`blog_${i}_title`],
      });
    }
    return blogs.map((blog, index) => (
      <div key={index} className="bg-white relative shadow-lg rounded-lg overflow-hidden flex flex-col items-center hover:shadow-xl hover:scale-105 transition-transform">
        
        <p className="absolute left-3 top-3 text-base font-semibold bg-teal-400 text-white p-2 rounded-lg mb-4">{blog.type}</p>

        
        <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover mb-4 rounded-md" />

        <div className="px-8 w-full">
          <div className="flex items-center justify-start mb-4">
          <img src={admin} alt="admin" />
          <p className=" text-base text-gray-500 font-medium mr-12 ml-2">{blog.position}</p>
          <img src={calender} alt="calender" />
          <p className=" text-base text-gray-500 font-medium ml-2">{blog.date}</p>
          </div>
          <h3 className="flex justify-start text-lg font-semibold text-gray-600 mb-8">{blog.title}</h3>
        </div>
      </div>
    ));
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${blogsData.background_image?.url})` }}
    >
      {/* Titles Section */}
      <div className="text-center mb-8 mt-24">
        <div className="font-semibold text-lg text-[#30ccd7] mb-4">
          <PrismicRichText field={blogsData.titl_1} />
        </div>
        <div className="text-5xl font-bold mb-8">
          <PrismicRichText field={blogsData.titl_2} />
        </div>
      </div>

      {/* Blogs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-10/12 px-4">
        {renderBlogs()}
      </div>

      {/* Button Section */}
      <button className="px-6 py-5 bg-[#ff7e84] w-full md:w-auto text-white font-semibold rounded-md shadow-md hover:bg-gray-400 transition my-14">
        {blogsData.read_all_blogs}
      </button>
    </div>
  );
};

export default Blogs;
