const Categories = require('../../database/models/Categories');
const Post = require('../../database/models/Post');

module.exports = (req, res) => {
  if (req.session.userId) {
    Categories.findByIdAndDelete(req.params.id, (err, doc) => {
      if(!err) { res.redirect('/admin'); } else {res.redirect('/login')}

    });
  } else {res.redirect('/login')}
}
