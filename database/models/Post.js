const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  category: {
    type: mongoose.Schema.Types.String,
    ref: 'Categories'
  },
  author: {
    type: String,
    ref: 'User'
  },
  image: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
