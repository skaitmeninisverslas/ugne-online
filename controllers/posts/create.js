const Categories = require('../../database/models/Categories');

module.exports = async (req, res) => {
  const category = await Categories.find({});

  if (req.session.userId) {
    return res.status(200).send(category);
  }

};
