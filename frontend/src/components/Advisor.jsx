import { FaLinkedinIn, FaTwitter } from "react-icons/fa";

const advisor = [
  {
    id: 1,
    name: "Aliu Musa",
    title: "Advisor",
    image: "/aliumusa.png",
    linkedinLink: "https://www.linkedin.com/in/aliumusa/",
    twitterLink: "https://twitter.com/herlew99",
  },
];
const Advisor = () => {
  return (
    <section>
      <div className="container mx-auto">
        <h2 className="text-[28px] sm:text-[32px] md:text-[48px] leading-[34px] sm:leading-[40px] md:leading-[57.6px] font-u font-medium text-center my-6 sm:my-8 md:my-12 text-[#292929]">
          Advisors.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-8 md:px-16 lg:px-20 pt-6 sm:pt-8 md:pt-12 pb-6 sm:pb-8">
          {advisor.map((person) => (
            <div
              key={person.id}
              className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:w-[360px] h-auto rounded-[10px] bg-white p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-[250px] sm:h-[280px] md:h-[300px] rounded-[10px] object-cover mb-4 hover:scale-105 transition ease-in-out duration-700 cursor-pointer "
              />
              <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold mb-2 text-[#292929]">
                {person.name}
              </h3>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] text-[#525252] mb-4">
                {person.title}
              </p>
              <div className="flex space-x-3">
                <a
                  href={person.linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#383D38] rounded-full p-2 hover:bg-gray-200 transition-colors"
                >
                  <FaLinkedinIn size={18} />
                </a>
                <a
                  href={person.twitterLink}
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

export default Advisor;
