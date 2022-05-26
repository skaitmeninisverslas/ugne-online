const Menu = require('../../database/models/Menu');

module.exports = async (req, res) => {
  const menu = await Menu.find({});
  return res.status(200).send(menu);
}
