const User = require('../database/models/User');

module.exports = async (req, res) => {
  const user = await User.findById(req.session.userId);

  if (user.username) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(400);
  }
}
