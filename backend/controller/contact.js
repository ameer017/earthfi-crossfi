const asyncHandler = require("express-async-handler");

exports.makeContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(200).json({ message: "Form submission successful!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
