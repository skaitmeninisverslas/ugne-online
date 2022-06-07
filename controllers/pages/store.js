const path = require("path");

const Page = require("../../database/models/Pages");

module.exports = async (req, res) => {
  const authenticated = req.isAuthenticated();

  if (authenticated) {
    const host = req.hostname;

    let image = {};
    let ogimage = {};

    if (req.files["image"]) {
      image = {
        image: `${req.protocol}://${host}:3000/uploads/${req.files[
          "image"
        ][0].path
          .split("\\")
          .slice(3)}`,
        image_type: req.files["image"][0].mimetype,
      };
    }

    if (req.files["ogimage"]) {
      ogimage = {
        ogimage: `${req.protocol}://${host}:3000/uploads/${req.files[
          "ogimage"
        ][0].path
          .split("\\")
          .slice(3)}`,
        ogimage_type: req.files["ogimage"][0].mimetype,
      };
    }

    const postEdit = {
      ...req.body,
      ...image,
      ...ogimage,
    };

    Page.create(postEdit, (error, post) => {
      if (!error) {
        res.status(200).send("Page edited");
      } else {
        res.status(400).send("An error ocurred", error);
      }
    });
  } else {
    res.redirect("/login");
  }
};
