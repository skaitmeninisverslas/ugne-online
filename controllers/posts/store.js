const Post = require("../../database/models/Post");
const User = require("../../database/models/User");
const sharp = require("sharp");

module.exports = async (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
    const user = await User.findById(req.user.id);

    let image = {};
    let ogimage = {};

    if (req.files["image"]) {
      await sharp(req.files["image"][0].buffer)
        .webp({ quality: 50 })
        .toBuffer()
        .then((newBuffer) => {
          return (req.files["image"][0].buffer = newBuffer);
        });

      image = {
        file: req.files["image"][0].buffer,
        mimetype: req.files["image"][0].mimetype,
      };
    }

    if (req.files["ogimage"]) {
      await sharp(req.files["ogimage"][0].buffer)
        .webp({ quality: 50 })
        .toBuffer()
        .then((newBuffer) => {
          return (req.files["ogimage"][0].buffer = newBuffer);
        });

      ogimage = {
        file: req.files["ogimage"][0].buffer,
        mimetype: req.files["ogimage"][0].mimetype,
      };
    }

    const postEdit = {
      author: user.username,
      ...req.body,
      image,
      ogimage,
    };

    Post.create(postEdit, (error, post) => {
      if (!error) {
        res.status(200).send("Deleted");
      } else {
        res.status(400).send(error);
      }
    });
  } else {
    res.redirect("/login");
  }
};
