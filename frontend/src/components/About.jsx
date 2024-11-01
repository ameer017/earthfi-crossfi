import React from "react";

const About = () => {
  return (
    <div className="container mx-auto p-8 md:p-12 bg-white rounded-xl space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          About Us
        </h1>
      </div>

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          Who We Are
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Welcome to <span className="font-bold text-green-600">EarthFi</span>,
          a blockchain-powered platform dedicated to revolutionizing the way we
          approach plastic recycling and sustainability. We are a team of
          visionaries, developers, and environmental advocates driven by a
          common goal:{" "}
          <b>
            {" "}
            to create a circular economy that redefines waste as a valuable
            resource.
          </b>
        </p>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 leading-relaxed">
          At <span className="font-bold text-green-600">EarthFi</span>, our
          mission is simple yet ambitious:{" "}
          <span className="italic">to transform plastic waste into value</span>.
          By leveraging blockchain technology, we aim to build a transparent,
          efficient, and global platform that incentivizes recycling efforts and
          empowers individuals and communities to contribute to environmental
          conservation. Through the use of blockchain infrastructure and its
          stable token, we provide seamless and impactful financial rewards to
          those participating in recycling activities.
        </p>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          Our Vision
        </h2>
        <p className="text-gray-600 leading-relaxed">
          We envision a world where{" "}
          <span className="italic">
            plastic waste is not just discarded but is actively repurposed to
            drive positive change
          </span>
          . EarthFi is committed to fostering a thriving, interconnected
          ecosystem where stakeholders—including individuals, businesses, and
          governments—collaborate to combat plastic pollution and promote
          sustainable practices.
        </p>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          What We Do
        </h2>
        <ul className="list-disc pl-5 text-gray-600 leading-relaxed space-y-2">
          <li>
            <span className="font-medium">Blockchain Transparency:</span> Our
            platform uses blockchain to ensure that every recycled item is
            tracked and verified, building trust within the recycling process.
          </li>
          <li>
            <span className="font-medium">Incentivized Recycling:</span> We
            reward individuals and organizations for their recycling efforts
            with stable token, making eco-friendly actions financially
            beneficial.
          </li>
          <li>
            <span className="font-medium">Global Integration:</span> Our
            approach is inclusive, bringing together recyclers, environmental
            organizations, and communities to centralize plastic recycling on a
            single, decentralized platform.
          </li>
          <li>
            <span className="font-medium">Community Engagement:</span> We engage
            with communities through workshops, partnerships, and educational
            resources to raise awareness about the importance of sustainability.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          Why We Stand Out
        </h2>
        <ul className="list-disc pl-5 text-gray-600 leading-relaxed space-y-2">
          <li>
            <span className="font-medium">Innovation with Purpose:</span> By
            integrating blockchain technology with environmental solutions,
            EarthFi offers an innovative way to incentivize recycling and
            promote responsible waste management.
          </li>
          <li>
            <span className="font-medium">Partnerships for Progress:</span> We
            work closely with local and global partners to ensure our impact is
            widespread and sustainable.
          </li>
          <li>
            <span className="font-medium">Secure and Scalable Platform:</span>{" "}
            Leveraging robust blockchain infrastructure, we provide a secure and
            scalable solution that can support millions of users and
            transactions globally.
          </li>
        </ul>
      </section>

      <section className="">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          Join Our Movement
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          At <span className="font-bold text-green-600">EarthFi</span>, we
          believe that every action counts, and together, we can create a world
          where sustainability and technology work hand in hand. We invite you
          to join our community, contribute to our vision, and be a part of the
          journey toward a greener future.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Whether you&nbsp;re an individual looking to make a difference, a
          business aiming to adopt sustainable practices, or an organization
          ready to partner for a greater cause,{" "}
          <span className="font-bold text-green-600">EarthFi</span> is here to
          provide the platform and the tools to turn intentions into impact.
        </p>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          Get Involved
        </h2>
        <ul className="list-disc pl-5 text-gray-600 leading-relaxed space-y-2">
          <li>
            <span className="font-medium">Recycle with Us:</span> Participate in
            our incentivized recycling program and earn rewards.
          </li>
          <li>
            <span className="font-medium">Partner with EarthFi:</span>{" "}
            Collaborate with us to scale the impact of plastic recycling
            globally.
          </li>
          <li>
            <span className="font-medium">Stay Informed:</span> Follow us for
            updates, news, and educational content on sustainability and
            blockchain innovations.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
