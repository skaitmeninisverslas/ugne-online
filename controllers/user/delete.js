const User = require("../../database/models/User");

module.exports = (req, res) => {
  User.findByIdAndDelete(req.user.Id, (error, post) => {
    if (!error) {
      res.status(200).send("User deleted");
    } else {
      res.status(400).send("An error ocurred", error);
    }
  });
};
