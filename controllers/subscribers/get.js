const Subscribers = require('../../database/models/Subscribers');

module.exports = async (req, res) => {
  const subscribers = await Subscribers.find();

  return res.status(200).send({subscribers});
}
