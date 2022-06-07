const Categories = require("../../database/models/Categories");
const Post = require("../../database/models/Post");

module.exports = (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
    Categories.findByIdAndDelete(req.params.id, (error, post) => {
      if (!error) {
        res.status(200).send("Category deleted");
      } else {
        res.status(400).send("An error ocurred", error);
      }
    });
  } else {
    res.redirect("/login");
  }
};
