const Menu = require('../../database/models/Menu');
const path = require('path');

module.exports = async (req, res) => {

  if( !req.files ) {
    const menuEdit = {
      title: req.body.title,
      email: req.body.email,
      about: req.body.about,
      sidebar: req.body.sidebar,
      socials: {
        facebook: req.body.facebook,
        instagram: req.body.instagram
      }
    };

    Menu.findByIdAndUpdate(req.params.id, menuEdit, (err, post) => {
      if(!err) {
        res.redirect('/admin');
      } else {console.log(err);}
    });
  } else {

    const { image } = req.files;

    image.mv(path.resolve(__dirname, '..', '..', 'client/build/images', image.name), (error) => {

      const menuEdit = {
        title: req.body.title,
        email: req.body.email,
        about: req.body.about,
        sidebar: req.body.sidebar,
        socials: {
          facebook: req.body.facebook,
          instagram: req.body.instagram
        },
        image: `/images/${image.name}`
      };

      Menu.findByIdAndUpdate(req.params.id, menuEdit, (err, post) => {
        if(!err) {
          res.redirect('/admin');
        } else {console.log(err);}
      });
    });
  }
}
