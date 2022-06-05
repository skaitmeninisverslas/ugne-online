const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./client/public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

const upload = multer({
  fileFilter(req, file, cb) {
    cb(undefined, true);
  },
  storage: storage,
});

const Page = require("../../database/models/Pages");

module.exports = [
  upload.fields([{ name: "image" }, { name: "ogimage" }]),
  async (req, res) => {
    const authenticated = req.isAuthenticated();

    const {
      title,
      content,
      subtitle,
      metitle,
      medescription,
      ogtitle,
      ogdescription,
    } = req.body;

    if (authenticated) {
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

      const postEdit = {
        title,
        content,
        subtitle,
        metitle,
        medescription,
        ogtitle,
        ogdescription,
        ...image,
        ...ogimage,
      };

      Page.create(postEdit, (err, post) => {
        if (!err) {
          res.status(200).send("Page edited");
        } else {
          res.status(400).send("An error ocurred", err);
        }
      });
    } else {
      res.redirect("/login");
    }
  },
];
