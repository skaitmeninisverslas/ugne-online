const Page = require("../../database/models/Pages");

module.exports = (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
    Page.findByIdAndDelete(req.params.id, (error, post) => {
      if (!error) {
        res.status(200).send("Page deleted");
      } else {
        res.status(400).send("An error ocurred", error);
      }
    });
  } else {
    res.redirect("/login");
  }
};
