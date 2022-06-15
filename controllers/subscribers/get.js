const Subscribers = require("../../database/models/Subscribers");

module.exports = async (req, res) => {
  const authenticated = req.isAuthenticated();

  const subscriber = (authenticated && (await Subscribers.find({}))) || null;

  return res.status(200).json({
    subscriber,
    authenticated,
  });
};
