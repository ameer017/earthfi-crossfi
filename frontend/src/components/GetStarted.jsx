import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const GetStarted = () => {
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFAQ = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqs = [
    {
      question: "What is EarthFi?",
      answer:
        "EarthFi is a cutting-edge platform that connects individuals businesses, and organizations to innovative waste management solutions. Our platform aims to transform waste into valuable resources, promoting environmental sustainability and economic growth.",
    },
    {
      question: "How does EarthFi work?",
      answer:
        "EarthFi offers a range of services and technologies designed to optimize waste management processes. Users can access features such as waste collection, recycling programs, resource recovery initiatives, and community engagement projects. By leveraging technology and collaboration, we facilitate the conversion of waste materials into useful products and services.",
    },
    {
      question: "Is EarthFi available in my area?",
      answer:
        "EarthFi strives to expand its reach and impact globally. While our services may not be available in every location at the moment, we are continuously working to broaden our network and establish partnerships with local communities and organizations. Stay updated with our latest developments to see when we'll be coming to your area!",
    },
    {
      question:
        "What measures does EarthFi take to ensure environmental responsibility?",
      answer:
        "Environmental responsibility is a core value of EarthFi. We adhere to strict environmental standards and regulations in all our operations and collaborate with certified recycling facilities and waste management partners. Additionally, we prioritize sustainability in product design, supply chain management, and resource utilization, aiming to minimize environmental impact at every stage of the waste management process.",
    },
    {
      question: "How can I contribute to EarthFi's mission?",
      answer:
        "There are several ways to contribute to EarthFi's mission of promoting waste-to-wealth initiatives and environmental sustainability",
    },
  ];

  return (
    <section className="p-6 font-nunito max-w-[90%] mx-auto sm:max-w-[700px] lg:max-w-[900px] shadow-md shadow-[rgba(3, 175, 108, 0.10)] border-2 rounded-lg my-6">
      <h1 className="text-3xl sm:text-4xl font-bold my-4 text-left">
        Get Started
      </h1>

      <p className="text-lg sm:text-xl  mb-6">
        Welcome to EarthFi! We're excited to have you join our community and
        start your journey towards a more sustainable future. Follow the steps
        below to get started:
      </p>

      <div className="p-6 ">
        {[
          {
            title: "Connect Your Digital Wallet",
            description:
              "To participate in on-chain transactions and access certain premium features, you'll need to connect your digital wallet to your account. Don't have a digital wallet yet? No problem! You can easily create one using popular wallet providers like MetaMask.",
          },
          {
            title: "Explore our services",
            description:
              "Take some time to explore the various services and features offered by EarthFi. From waste management solutions to resource recovery and community engagement initiatives, there's something for everyone!",
          },
          {
            title: "Join Our Community",
            description:
              "Connect with like-minded individuals, businesses, and organizations in our vibrant community dedicated to sustainability and waste reduction. Share your ideas, collaborate on projects, and be part of the change!",
          },
          {
            title: "Get Support",
            description:
              "Have questions or need assistance? Our dedicated support team is here to help! Reach out to us via email at team@earthfi.xyz or visit our Help Center for FAQs and troubleshooting guides.",
          },
          {
            title: "Spread the Word",
            description:
              "Help us spread the word about EarthFi and the importance of waste recycling initiatives. Follow us on social media, share your experiences, and invite others to join our mission!",
          },
        ].map((step, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-[20px] font-semibold mb-2">
              {index + 1}. {step.title}
            </h2>
            <p className="text-lg">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b p-4  transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <span className="text-lg">
                  {faqOpen === index ? <FiMinus size={20} /> : <FiPlus  size={20}/>}
                </span>
              </div>
              {faqOpen === index && (
                <p className="mt-3 text-gray-700 text-sm sm:text-base">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="my-[25px] text-[15px] ">
        Ready to get started? Connect your wallet and let's make a difference
        together!
      </p>
    </section>
  );
};

export default GetStarted;
