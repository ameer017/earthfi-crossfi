import React from "react";

const GetStarted = () => {
  return (
    <section className="p-[53px] font-nunito ">
      <h1 className="text-[40px] my-4 ">Get Started</h1>

      <p className="text-[20px] ">
        Welcome to EarthFi! We're excited to have you join our community and
        start your journey towards a more sustainable future. Follow the steps
        below to get started:
      </p>

      <div className="border-2 p-[52px] w-full md:w-[902px] rounded-lg mt-[67px] shadow-md shadow-[rgba(3, 175, 108, 0.10)] ">
        <div className="mb-[15px] ">
          <h2 className="text-[20px] mb-[10px] ">
            1. Connect Your Digital Wallet.
          </h2>

          <p className="text-[16px] ">
            To participate in on-chain transactions and access certain premium
            features, you'll need to connect your digital wallet to your
            account. Don't have a digital wallet yet? No problem! You can easily
            create one using popular wallet providers like MetaMask or Trust
            Wallet.
          </p>
        </div>

        <div className="mb-[15px] ">
          <h2 className="text-[20px] mb-[10px] capitalize">
            2. Explore our services.
          </h2>

          <p className="text-[16px] ">
            Take some time to explore the various services and features offered
            by EarthFi. From waste management solutions to resource recovery and
            community engagement initiatives, there's something for everyone!
          </p>
        </div>

        <div className="mb-[15px] ">
          <h2 className="text-[20px] mb-[10px] capitalize">
            3. Join Our Community
          </h2>

          <p className="text-[16px] ">
            Connect with like-minded individuals, businesses, and organizations
            in our vibrant community dedicated to sustainability and waste
            reduction. Share your ideas, collaborate on projects, and be part of
            the change!
          </p>
        </div>

        <div className="mb-[15px] ">
          <h2 className="text-[20px] mb-[10px] capitalize">4. Get Support</h2>

          <p className="text-[16px] ">
            Have questions or need assistance? Our dedicated support team is
            here to help! Reach out to us via email at{" "}
            <a href="mailto:team@earthfi.xyz"> team@earthfi.xyz</a> or visit our
            Help Center for FAQs and troubleshooting guides.
          </p>
        </div>

        <div className="mb-[15px] ">
          <h2 className="text-[20px] mb-[10px] capitalize">
            5. Spread the Word
          </h2>

          <p className="text-[16px] ">
            Help us spread the word about EarthFi and the importance of waste
            recycling initiatives. Follow us on social media, share your
            experiences, and invite others to join our mission!
          </p>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
