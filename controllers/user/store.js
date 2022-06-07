const User = require("../../database/models/User");
const path = require("path");

module.exports = (req, res) => {
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

  const userCreate = {
    ...req.body,
    ...image,
  };

  User.create(userCreate, (error, post) => {
    if (!error) {
      res.status(200).send("User created");
    } else {
      res.status(400).send("An error ocurred", error);
    }
  });
};
