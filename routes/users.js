// all /users routes
const express = require("express"),
  router = express.Router();

router.get("/register", (req, res, next) => {
  res.send("register");
});

router.get("/authenticate", (req, res, next) => {
  res.send("authenticate");
});

// Profile ROUTE - protected
router.get("/profile", (req, res, next) => {
  res.send("profile");
});

router.get("/validate", (req, res, next) => {
  res.send("validate");
});

module.exports = router;
