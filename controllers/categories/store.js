const Categories = require("../../database/models/Categories");

module.exports = (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
    Categories.create({ ...req.body }, (error, post) => {
      if (!error) {
        res.status(200).send("Category saved");
      } else {
        res.status(400).send("An error ocurred", error);
      }
    });
  } else {
    res.redirect("/login");
  }
};
