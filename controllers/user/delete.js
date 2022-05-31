const User = require("../../database/models/User");

module.exports = (req, res) => {
  User.findByIdAndDelete(req.user.Id, (err, doc) => {
    if (!err) {
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
};
