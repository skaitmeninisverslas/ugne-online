const Categories = require("../../database/models/Categories");

module.exports = (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
    Categories.create({ title: req.body.title }, (error, post) => {
      res.redirect("/admin");
    });
  } else {
    res.redirect("/login");
  }
};
