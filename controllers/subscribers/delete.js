const Subscribers = require("../../database/models/Subscribers");

module.exports = (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
    Subscribers.findByIdAndDelete(req.params.id, (error, post) => {
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
