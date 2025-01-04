import React, { useEffect, useState } from "react";
import { client } from "../../prismicio";
import { PrismicRichText } from "@prismicio/react"; // Import PrismicRichText
import { RiFacebookFill } from "react-icons/ri";
import { IoLogoTwitter } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";

const TeamSection = () => {
  const [mainTitle1, setMainTitle1] = useState("");
  const [mainTitle2, setMainTitle2] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await client.getSingle("team_section");
      
      setMainTitle1(response.data.main_title_1);
      setMainTitle2(response.data.main_title_2);

      // Set team members data
      setTeamMembers([
        {
          name: response.data.team_member_1_name,
          title: response.data.team_member_1_title,
          image: response.data.team_member_1_image.url,
        },
        {
          name: response.data.team_member_2_name,
          title: response.data.team_member_2_title,
          image: response.data.team_member_2_image.url,
        },
        {
          name: response.data.team_member_3_name,
          title: response.data.team_member_3_title,
          image: response.data.team_member_3_image.url,
        },
        {
          name: response.data.team_member_4_name,
          title: response.data.team_member_4_title,
          image: response.data.team_member_4_image.url,
        },
      ]);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 bg-brown-100">
      <div className="text-center my-24">
        <div className="text-xl font-medium mb-4 text-teal-400">
          <PrismicRichText field={mainTitle1} />
        </div>
        <div className="text-5xl font-bold text-gray-600">
          <PrismicRichText field={mainTitle2} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-32">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="card bg-white hover:bg-white transition duration-150 hover:-translate-y-1 shadow-md rounded-md p-6 text-center h-96 flex flex-col items-center justify-between border-t-4 border-transparent hover:border-t-teal-300"
          >
            <img 
              src={member.image} 
              alt={member.name} 
              className="mx-auto mb-6 w-32 h-32 rounded-full" 
            />
            <h2 className="text-xl mb-2 font-semibold">{member.name}</h2>
            <p className="text-gray-600 mb-4">{member.title}</p>
            
            {/* Social Media Icons */}
            <div className="flex justify-center space-x-8 text-4xl">
              <RiFacebookFill className="bg-blue-400 text-white p-2 rounded-lg" />
              <IoLogoTwitter className="bg-sky-500 text-white p-2 rounded-lg"/>
              <FaLinkedinIn className="bg-blue-400 text-white p-2 rounded-lg"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
