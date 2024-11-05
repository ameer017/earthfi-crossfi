import { FaLinkedinIn, FaTwitter } from "react-icons/fa";

const team = [
  {
    id: 1,
    name: "Abdullahi Raji",
    title: "Co-Founder, CTO",
    image: "/abdullah.jpeg",
    linkedinLink: "https://www.linkedin.com/in/alameer98",
    twitterLink: "https://twitter.com/alAmeer170",
  },
  {
    id: 2,
    name: "Rokeebah Olajide",
    title: "Marketing Lead",
    image: "/roqeebah.png",
    linkedinLink: "https://www.linkedin.com/in/olajide-rokeebat-98507329a/",
    twitterLink: "https://twitter.com/Olabimpe963",
  },
  {
    id: 3,
    name: "Kehinde Abubakar",
    title: "Project Lead",
    image: "/kenny.png",
    linkedinLink: "https://www.linkedin.com/in/kehinde-abubakar-029223252/",
    twitterLink: "https://twitter.com/kennySpec",
  },
  {
    id: 4,
    name: "Khadijah Musa",
    title: "Software Dev",
    image: "/khadija.png",
    linkedinLink: "https://www.linkedin.com/in/khadijah-musa-851a80251",
    twitterLink: "https://twitter.com/khady_bola",
  },
  {
    id: 5,
    name: "Abdulakeem Adebayo",
    title: "Blockchain Dev",
    image: "/bayo.png",
    linkedinLink: "https://www.linkedin.com/in/adebayo-ademola-678530199",
    twitterLink: "https://twitter.com/AkeemAd28605307",
  },
];

const Team = () => {
  return (
    <section className="relative pt-[66px]">
      <div className="container mx-auto">
        <h2 className="text-[28px] sm:text-[32px] md:text-[48px] leading-[34px] sm:leading-[40px] md:leading-[57.6px] font-u font-medium text-center my-6 sm:my-8 md:my-12 text-[#292929]">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-8 md:px-16 lg:px-20 pt-6 sm:pt-8 md:pt-12 pb-6 sm:pb-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:w-[360px] h-auto rounded-[10px] bg-white p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-[250px] sm:h-[280px] md:h-[300px] rounded-[10px] object-cover mb-4 hover:scale-105 transition ease-in-out duration-700 cursor-pointer "
              />
              <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold mb-2 text-[#292929]">
                {member.name}
              </h3>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] text-[#525252] mb-4">
                {member.title}
              </p>
              <div className="flex space-x-3">
                <a
                  href={member.linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#383D38] rounded-full p-2 hover:bg-gray-200 transition-colors"
                >
                  <FaLinkedinIn size={18} />
                </a>
                <a
                  href={member.twitterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#383D38] rounded-full p-2 hover:bg-gray-200 transition-colors"
                >
                  <FaTwitter size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;





