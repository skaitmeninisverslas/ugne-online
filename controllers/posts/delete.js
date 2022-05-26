const Post = require('../../database/models/Post');

module.exports = (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err, doc) => {
    if(!err) {
      res.redirect('/admin');
    } else {res.redirect('/login')}

  });
}
