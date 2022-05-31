const Post = require("../../database/models/Post");

module.exports = (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
    Post.findByIdAndDelete(req.params.id, (err, doc) => {
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
