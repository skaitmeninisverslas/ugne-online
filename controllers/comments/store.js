const Comments = require("../../database/models/Comments");

module.exports = (req, res) => {
  Comments.create({ ...req.body }, (error, post) => {
    if (!error) {
      res.status(200).send("Comment deleted");
    } else {
      res.status(400).send("An error ocurred", error);
    }
  });
};
