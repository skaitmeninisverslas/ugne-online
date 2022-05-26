const Page = require('../../database/models/Pages');

module.exports = async (req, res) => {
  const page = await Page.findOne({title: req.params.title});

  return res.status(200).send({page});
}
