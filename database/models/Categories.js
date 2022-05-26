const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  title: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
});

const Categories = mongoose.model('Categories', CategorySchema);

module.exports = Categories;
