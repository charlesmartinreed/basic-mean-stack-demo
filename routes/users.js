// all /users routes
const express = require("express"),
  router = express.Router();

const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", (req, res, next) => {
  // Create a new user
  const { name, email, username, password } = req.body;
  let newUser = new User({
    name,
    email,
    username,
    password
  });

  // call add User
  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: "Failed to register user" });
    } else {
      res.json({ success: true, msg: "User was successfully registered" });
    }
  });
});

router.post("/authenticate", (req, res, next) => {
  res.send("authenticate");
});

// Profile ROUTE - protected
router.get("/profile", (req, res, next) => {
  res.send("profile");
});

module.exports = router;
