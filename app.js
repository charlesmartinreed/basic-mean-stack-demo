const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/db");

// connect our db
mongoose.connect(
  config.database,
  { useNewUrlParser: true }
);

// notify of connection/failure to DB
var db = mongoose.connection;

db.once("open", () => {
  console.log(`connected to DB ${config.database}`);
});
db.on("error", err => {
  console.log(`Database error: ${err.message}`);
});

const app = express(),
  port = process.env.PORT || 3000;

const users = require("./routes/users");
// MIDDLEWARE SETUP

// BodyParser
app.use(express.json());

// CORS - we want any domain to be able to access this, we'll cover our tracks with auth
app.use(cors());

// SET STATIC FOLDER for serving assets
app.use(express.static("public"));

// ROUTES
app.use("/users", users);

// Index ROUTE
app.get("/", (req, res, body) => {
  res.send("Invalid Endpoint");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
