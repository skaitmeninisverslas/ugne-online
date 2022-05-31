const Categories = require("../../database/models/Categories");

module.exports = (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
    Categories.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      (err, post) => {
        if (!err) {
          res.redirect("/admin");
        } else {
          res.redirect("/category/edit/" + req.body.title);
        }
      }
    );
  } else {
    res.redirect("/login");
  }
};
