const path = require('path');
const Post = require('../../database/models/Post');
const User = require('../../database/models/User');

module.exports = async (req, res) => {
    const user = await User.findById(req.session.userId);

  if( !req.files ) {
    const postEdit = {
      author: user.username,
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      category: req.body.category
    };

    Post.findByIdAndUpdate(req.params.id, postEdit, (err, post) => {
      if(!err) {
        res.redirect('/post/' + req.body.title);
      } else {console.log(err);}
    });
  } else {

    const { image } = req.files;

    image.mv(path.resolve(__dirname, '..', '..', 'client/build/images', image.name), (error) => {

      const postEdit = {
        author: user.username,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        category: req.body.category,
        image: `/images/${image.name}`
      };

      Post.findByIdAndUpdate(req.params.id, postEdit, (err, post) => {
        if(!err) {
          res.redirect('/post/' + req.body.title);
        } else {console.log(err);}
      });
    });
  }
}
