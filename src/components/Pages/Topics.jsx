import React, { useEffect, useState } from "react";
import { client } from "../../prismicio";
import t1 from "../../assets/images/icon/t1.svg";
import t2 from "../../assets/images/icon/t2.svg";
import t3 from "../../assets/images/icon/t3.svg";
import t4 from "../../assets/images/icon/t4.svg";
import t5 from "../../assets/images/icon/t5.svg";
import t6 from "../../assets/images/icon/t6.svg";
import t7 from "../../assets/images/icon/t7.svg";
import t8 from "../../assets/images/icon/t8.svg";
import { PrismicRichText } from "@prismicio/react"; // Import PrismicRichText

const Topics = () => {
  const [topicsData, setTopicsData] = useState([]);
  const [mainTitle1, setMainTitle1] = useState("");
  const [mainTitle2, setMainTitle2] = useState("");

  const icons = [t1, t2, t3, t4, t5, t6, t7, t8]; // Icons array for mapping

  useEffect(() => {
    const fetchData = async () => {
      const response = await client.getSingle("topic_section");
      setMainTitle1(response.data.title_1);
      setMainTitle2(response.data.title_2);
      setTopicsData([
        { title: response.data.topic_1_title, quantity: response.data.topic_1_quantity },
        { title: response.data.topic_2_title, quantity: response.data.topic_2_quantity },
        { title: response.data.topic_3_title, quantity: response.data.topic_3_quantity },
        { title: response.data.topic_4_title, quantity: response.data.topic_4_quantity },
        { title: response.data.topic_5_title, quantity: response.data.topic_5_quantity },
        { title: response.data.topic_6_title, quantity: response.data.topic_6_quantity },
        { title: response.data.topic_7_title, quantity: response.data.topic_7_quantity },
        { title: response.data.topic_8_title, quantity: response.data.topic_8_quantity },
      ]);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4  mb-14">
      <div className="text-center my-24">
        <div className="text-xl font-medium mb-4 text-teal-400">
          <PrismicRichText 
            field={mainTitle1} 
          />
        </div>
        <div className="text-5xl font-bold text-gray-600">
          <PrismicRichText 
            field={mainTitle2} 
          />
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-24">
        {topicsData.map((topic, index) => (
          <div
            key={index}
            className="card bg-red-100 hover:bg-white transition duration-150 hover:-translate-y-1 shadow-md rounded-md p-6 text-center h-72 flex flex-col items-center justify-center"
          >
            <img src={icons[index]} alt={topic.title} className="mx-auto mb-6 w-12 h-12 " />
            <h2 className="text-xl mb-4 font-semibold">{topic.title}</h2>
            <p className="text-gray-600">{topic.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topics;
