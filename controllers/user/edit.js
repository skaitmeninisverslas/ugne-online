const path = require("path");

const User = require("../../database/models/User");

module.exports = async (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
    const host = req.hostname;

    let image = {};

    if (req.file) {
      image = {
        image: `${req.protocol}://${host}:3000/uploads/${req.file.path
          .split("\\")
          .slice(3)}`,
        image_type: req.file.mimetype,
      };
    }

    const userEdit = {
      ...req.body,
      ...image,
    };

    User.findByIdAndUpdate(req.user.id, userEdit, (error, post) => {
      if (!error) {
        res.status(200).send("USER_EDITED");
      } else {
        res.status(400).send("NOT_SAVED");
      }
    });
  } else {
    res.redirect("/login");
  }
};
