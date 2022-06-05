const passport = require("passport");
const multer = require("multer");
const upload = multer();

module.exports = [
  upload.none(),
  (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/admin",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  },
];
