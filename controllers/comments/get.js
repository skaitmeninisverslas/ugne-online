const Comments = require("../../database/models/Comments");

module.exports = async (req, res) => {
  const comments = await Comments.find({});

  return res.status(200).json({
    comments,
  });
};
