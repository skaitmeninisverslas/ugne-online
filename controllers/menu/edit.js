const sharp = require("sharp");

const Menu = require("../../database/models/Menu");

module.exports = async (req, res) => {
  const authenticated = req.isAuthenticated();

  const { title, email, about, sidebar, facebook, instagram } = req.body;

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

    const menuEdit = {
      title,
      email,
      about,
      sidebar,
      socials: {
        facebook,
        instagram,
      },
      image,
    };

    Menu.findByIdAndUpdate(req.params.id, menuEdit, (error, post) => {
      if (!error) {
        res.status(200).send("MENU_EDITED");
      } else {
        res.status(400).send("NOT_SAVED");
      }
    });
  } else {
    res.redirect("/login");
  }
};
