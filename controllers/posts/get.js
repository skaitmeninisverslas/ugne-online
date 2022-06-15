const Post = require("../../database/models/Post");

module.exports = async (req, res) => {
  const post = await Post.find({});

  return res.status(200).json({
    post,
  });
};
