const path = require("path");

const Post = require("../../database/models/Post");
const User = require("../../database/models/User");

module.exports = async (req, res) => {
  const authenticated = req.isAuthenticated();
  const {
    title,
    category,
    content,
    description,
    metitle,
    medescription,
    ogtitle,
    ogdescription,
  } = req.body;

  if (authenticated) {
    const user = await User.findById(req.user.id);

    const host = req.host;

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

    Post.create(
      {
        title,
        content,
        description,
        author: user.username,
        category,
        metitle,
        medescription,
        ogtitle,
        ogdescription,
        ...image,
        ...ogimage,
      },
      (error, post) => {
        res.status(200).send("Post saved");
      }
    );
  } else {
    res.redirect("/login");
  }
};
