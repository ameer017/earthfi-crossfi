const express = require("express");
const { makeContact } = require("../controller/contact");
const router = express.Router();

router.post("/create-contact", makeContact);

module.exports = router;
