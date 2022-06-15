const sharp = require("sharp");

const User = require("../../database/models/User");

module.exports = async (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
    let image = {};

    if (req.file) {
      await sharp(req.file.buffer)
        .webp({ quality: 50 })
        .toBuffer()
        .then((newBuffer) => {
          return (req.file.buffer = newBuffer);
        });

      image = {
        file: req.file.buffer,
        mimetype: req.file.mimetype,
      };
    }

    const userEdit = {
      ...req.body,
      image,
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
