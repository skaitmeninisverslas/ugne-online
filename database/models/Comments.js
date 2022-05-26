const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: String,
  post: String,
  user: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const Comments = mongoose.model('Comments', CommentSchema);

module.exports = Comments;
