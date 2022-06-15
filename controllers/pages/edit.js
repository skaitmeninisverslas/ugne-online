const sharp = require("sharp");

const Page = require("../../database/models/Pages");

module.exports = async (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
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
      ...req.body,
      image,
      ogimage,
    };

    Page.findByIdAndUpdate(req.params.id, postEdit, (error, post) => {
      if (!error) {
        res.status(200).send("Page saved");
      } else {
        res.status(400).send("An error ocurred", error);
      }
    });
  } else {
    res.redirect("/login");
  }
};
