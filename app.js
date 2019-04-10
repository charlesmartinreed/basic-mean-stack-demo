const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

const app = express(),
  port = process.env.PORT || 3000;

// MIDDLEWARE SETUP
app.use(express.json());

app.get("/", (req, res, body) => {
  res.send("Invalid Endpoint");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
