// all /users routes
const express = require("express"),
  router = express.Router();

const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/db");

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
  // get user name and password being submitted
  const { username, password } = req.body;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }

    // if there's a user, check the password
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        // create a token by passing in the user, the secret and options
        const token = jwt.sign({ data: user }, config.secret, {
          expiresIn: 604800 //1 week
        });
        // front end response sends back success, a token and the user info minus the password
        res.json({
          success: true,
          token: `JWT ${token}`,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, msg: "Access Denied" });
      }
    });
  });
});

// Profile ROUTE - protected
// protection is as simple as adding 'passport.authenticate()', with the strategy passed in as an argument
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({ user: req.user });
  }
);

module.exports = router;
