const Page = require("../../database/models/Pages");

module.exports = (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
    Page.findByIdAndDelete(req.params.id, (err, doc) => {
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
