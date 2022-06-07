const Comments = require("../../database/models/Comments");

module.exports = (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
    Comments.findByIdAndDelete(req.params.id, (error, post) => {
      if (!error) {
        res.status(200).send("Comment deleted");
      } else {
        res.status(400).send("An error ocurred", error);
      }
    });
  } else {
    res.redirect("/login");
  }
};
