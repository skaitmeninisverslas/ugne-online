const Post = require("../../database/models/Post");

module.exports = (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
    Post.findByIdAndDelete(req.params.id, (error, post) => {
      if (!error) {
        res.status(200).send("Deleted");
      } else {
        res.status(400).send("An error ocurred", error);
      }
    });
  } else {
    res.redirect("/login");
  }
};
