import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post(
        "https://earthfi-r6js.vercel.app/api/contact",
        formData
      );
      setResponseMessage(response.data.message);
      // Clear form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setError("Error sending message: " + error.message);
    }
  };

  return (
    <section
      className="flex items-center justify-center p-6 h-[85vh] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(240, 255, 240, 0.8), rgba(255, 255, 255, 0.2)), url('/herobg.png')",
        backgroundSize: "contain",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="shadow-lg p-6 rounded-lg bg-white/70 flex flex-col max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Get In Touch
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          ></textarea>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Send Message
          </button>
        </div>

        {responseMessage && (
          <p className="mt-4 text-center text-gray-700">{responseMessage}</p>
        )}
      </form>
    </section>
  );
};

export default Contact;
