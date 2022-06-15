const passport = require("passport");

module.exports = [
  passport.authenticate("local"),
  (req, res, next) => {
    const authenticated = req.isAuthenticated();

    if (authenticated) {
      res.status(200).send("USER_LOGGED");
    } else {
      res.status(400).send("NOT_LOGGED");
    }
  },
];
