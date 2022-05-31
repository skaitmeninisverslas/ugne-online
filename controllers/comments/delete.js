const Comments = require("../../database/models/Comments");

module.exports = (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
    Comments.findByIdAndDelete(req.params.id, (err, doc) => {
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
