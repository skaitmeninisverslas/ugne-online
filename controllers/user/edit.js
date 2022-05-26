const User = require('../../database/models/User');
const path = require('path');

module.exports = async (req, res) => {

  if( !req.files ) {
    const userEdit = {
      username: req.body.username,
      email: req.body.email
    };

    User.findByIdAndUpdate(req.session.userId, userEdit, (err, post) => {
      if(!err) {
        res.redirect('/admin');
      } else {console.log(err);}
    });
  } else {

    const { image } = req.files;

    image.mv(path.resolve(__dirname, '..', '..', 'client/build/images', image.name), (error) => {

      const userEdit = {
        username: req.body.username,
        email: req.body.email,
        image: `/images/${image.name}`
      };

      User.findByIdAndUpdate(req.session.userId, userEdit, (err, post) => {
        if(!err) {
          res.redirect('/admin');
        } else {console.log(err);}
      });
    });
  }
}
