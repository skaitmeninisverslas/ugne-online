const Post = require('../../database/models/Post');
const Categories = require('../../database/models/Categories');

module.exports = async (req, res) => {
    const categories = await Categories.findOne({title: req.params.category});
    const posts = await Post.find({category: categories._id});

    return res.status(200).send({posts, categories});
}
