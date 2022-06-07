const Menu = require("../../database/models/Menu");

module.exports = async (req, res) => {
  const authenticated = req.isAuthenticated();

  const { title, email, about, sidebar, facebook, instagram } = req.body;

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

    const menuEdit = {
      title,
      email,
      about,
      sidebar,
      socials: {
        facebook,
        instagram,
      },
      ...image,
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
