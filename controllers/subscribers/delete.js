const Subscribers = require("../../database/models/Subscribers");

module.exports = (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
    Subscribers.findByIdAndDelete(req.params.id, (err, doc) => {
      if (!err) {
        res.redirect("/admin");
      } else {
        res.redirect("/login");
      }
    });
  } else {
    res.redirect("/login");
  }
};
