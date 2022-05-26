const Categories = require('../../database/models/Categories');

module.exports = (req, res) => {

  if(req.session.userId) {
    Categories.create({title: req.body.title}, (error, post) => {
        res.redirect('/admin');
    });
  } else {res.redirect('/login')}
}
