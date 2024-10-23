import React from 'react';
import abdullahi from "../../public/Images/abdullahi.svg";
import rokeebah from "../../public/Images/rokeebah.svg";
import kenny from "../../public/Images/kenny.svg";
import khadijah from "../../public/Images/khadijah.svg";
import adebayo from "../../public/Images/adebayo.svg";
import twitter from "../../public/Images/twitter.svg";
import linkedIn from "../../public/Images/linkedIn.svg";
import EarthFiIcon from "../../public/Images/earthFiIcon.svg";

const team = [
  {
    id: 1,
    name: 'Abdullahi Raji',
    title: 'Co-Founder, CTO',
    image: abdullahi, 
    linkedinLink: 'https://www.linkedin.com',
    twitterLink: 'https://twitter.com',
  },
  {
    id: 2,
    name: 'Rokeebah Olajide',
    title: 'Marketing Lead',
    image: rokeebah, 
    linkedinLink: 'https://www.linkedin.com',
    twitterLink: 'https://twitter.com',
  },
  {
    id: 3,
    name: 'Kehinde Abubakar',
    title: 'Project Lead',
    image: kenny, 
    linkedinLink: 'https://www.linkedin.com',
    twitterLink: 'https://twitter.com',
  },
  {
    id: 4,
    name: 'Khadijah Musa',
    title: 'Software Dev',
    image: khadijah, 
    linkedinLink: 'https://www.linkedin.com',
    twitterLink: 'https://twitter.com',
  },
  {
    id: 5,
    name: 'Abdulakeem Adebayo',
    title: 'Blockchain Dev',
    image: adebayo, 
    linkedinLink: 'https://www.linkedin.com',
    twitterLink: 'https://twitter.com',
  },
];

const Team = () => {
  return (
    <section className="relative">
      <div className="container mx-auto">
        <h2 className="text-[32px] md:text-[48px] leading-[40px] md:leading-[57.6px] font-u font-medium text-center mb-8 md:mb-12 text-[#292929]">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-16 lg:px-20 pt-8 md:pt-12 pb-8">
          {team.map((member) => (
            <div key={member.id} className="w-full max-w-xs mx-auto md:max-w-none lg:w-[361.87px] h-auto rounded-[10px] bg-white p-4">
              <img
                src={member.image} 
                alt={member.name}
                className="w-full h-auto rounded-[10px] mb-4"
              />
              <h3 className="text-[24px] md:text-[28px] lg:text-[32px] font-normal leading-[30px] md:leading-[36px] lg:leading-[38.4px] mb-2 text-[#292929]">
                {member.name}
              </h3>
              <p className="text-[16px] md:text-[18px] lg:text-[20px] font-normal leading-[20px] md:leading-[24px] text-[#525252] mb-4">
                {member.title}
              </p>
              <div className="flex space-x-4 pl-2">
                <a href={member.linkedinLink} target="_blank" rel="noopener noreferrer" className="border border-[#383D38] rounded-full p-2">
                  <img src={linkedIn} alt="LinkedIn" className="w-4 h-4" />
                </a>
                <a href={member.twitterLink} target="_blank" rel="noopener noreferrer" className="border border-[#383D38] rounded-full p-2">
                  <img src={twitter} alt="Twitter" className="w-4 h-4"/>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 hidden md:block">
        <img src={EarthFiIcon} alt="Icon" className="md:w-[300px] lg:w-[363.23px] h-auto" />
      </div>
    </section>
  );
};

export default Team;
