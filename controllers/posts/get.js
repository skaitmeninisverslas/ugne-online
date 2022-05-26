const Post = require('../../database/models/Post');
const Categories = require('../../database/models/Categories');


module.exports = async (req, res) => {
  const post = await Post.findOne({title: req.params.title});
  const category = await Categories.findOne({_id: post.category});

  return res.status(200).send({post, category});
}
