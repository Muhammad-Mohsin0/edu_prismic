import React, { useEffect, useState } from "react";
import { client } from "../../prismicio"; // Adjust the path as needed
import { PrismicRichText } from "@prismicio/react";
import clock from "../../assets/images/svg/clock.svg";
import fileIcon from "../../assets/images/icon/file.svg";
import starIcon from "../../assets/images/icon/star.svg";




const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#ff7e84] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Courses = () => {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await client.getSingle("courses_section"); // Replace with your Custom Type ID
      setCourseData(response.data);
    };
    fetchData();
  }, []);

  if (!courseData) {
    return <LoadingSpinner />;
  }

  const renderCourses = () => {
    const courses = [];
    for (let i = 1; i <= 6; i++) {
      courses.push({
        id: courseData[`course_${i}_id`],
        post: courseData[`course_${i}_post`],
        title: courseData[`course_${i}_title`],
        price: courseData[`course_${i}_price`],
        img: courseData[`course_${i}_img`]?.url,
        ratings: courseData[`course_${i}_ratings`],
        time: courseData[`course_${i}_time`],
        lessons: courseData[`course_${i}_lessons`],
      });
    }
    return courses.map((course, index) => (
      <div
        key={index}
        className="bg-white relative shadow-lg rounded-lg overflow-hidden flex flex-col items-center hover:shadow-xl hover:scale-105 transition-transform"
        >
         <p className=" absolute left-3 top-3 justify-start text-base font-semibold bg-teal-400 text-white p-2 rounded-lg mb-4">{course.post}</p>

        <img
          src={course.img}
          alt={course.title}
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
        <div>
        <div className="px-8 ">
        <p className="flex justify-start text-lg font-semibold text-[#30ccd7] mb-2">
          {course.price}
        </p>
        <h3 className="flex  justify-start text-lg font-semibold text-gray-600 mb-2">{course.title}</h3>
       
        </div>
        {/* Ratings */}
        <div className="flex items-center justify-around text-base text-gray-500 mb-4">
            <div className="flex items-center">
          <img src={starIcon} alt="Ratings" className="w-4 h-4 mr-2" />
          {course.ratings}
            </div>
        

       <div className="flex items-center">
          <img src={clock} alt="Time" className="w-4 h-4 mr-2" />
          {course.time}
       </div>
       <div className="flex items-center">
          <img src={fileIcon} alt="Lessons" className="w-4 h-4 mr-2" />
          {course.lessons}
       </div>
        </div>
        </div>
      </div>
      
    ));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Titles Section */}
      <div className="text-center mb-8 mt-24">
        <div className="font-semibold text-lg text-[#30ccd7] mb-4">
          <PrismicRichText field={courseData.main_title_1} />
        </div>
        <div className="text-5xl font-bold mb-8     ">
          <PrismicRichText field={courseData.main_title_2} />
        </div>
      </div>

      {/* Courses Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-10/12 px-4">
        {renderCourses()}
      </div>


      {/* Button Section */}
      <button className="px-6 py-5 bg-[#ff7e84] w-full md:w-auto text-white font-semibold rounded-md shadow-md hover:bg-gray-400 transition my-14">
        {courseData.view_course_button}
      </button>
    </div>
  );
};

export default Courses;
