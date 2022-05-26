const User = require('../../database/models/User');

module.exports = async (req, res) => {
  const user = await User.findById(req.session.userId);

  if (user.username) {
    return res.status(200).send(user);
  } else {
    return res.sendStatus(400);
  }
}
