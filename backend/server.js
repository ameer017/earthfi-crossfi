require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const contactRouter = require("./route/contactRoute");
const connectDB = require("./connectDB");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionSuccessStatus: 200,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/contact", contactRouter);

connectDB();
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
});
