const { redirect } = require("express/lib/response");

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

module.exports = [
  upload.fields([{ name: "image" }, { name: "ogimage" }]),
  (req, res, next) => {
    if (
      !req.files ||
      !req.body.category ||
      !req.body.title ||
      !req.body.description ||
      !req.body.content
    ) {
      return res.redirect("/admin");
    }

    next();
  },
];
