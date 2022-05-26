const User = require('../../database/models/User');
const path = require('path');

module.exports = (req, res) => {
  const { image } = req.files;

  image.mv(path.resolve(__dirname, '..', '..', 'client/public/images', image.name), async (error) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    about: req.body.about,
    socials: {
      facebook: req.body.facebook,
      instagram: req.body.instagram
    },
    image: `/images/${image.name}`
  }, (error, user) => {
      if (error) {
        console.log(error)
        const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)

        req.flash('registrationErrors', registrationErrors)
        return res.redirect('/auth/register')
      }
      res.redirect('/')
    })
  });
}
