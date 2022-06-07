const Subscribers = require("../../database/models/Subscribers");

module.exports = (req, res) => {
  const subscribe = req.body.subscribe;

  Subscribers.findOne({ email: subscribe }, (error, subscriber) => {
    if ((subscriber && subscribe != subscriber.email) || !subscriber) {
      Subscribers.create({ email: subscribe }, (error, post) => {
        res.status(200).send("SUBSCRIBED");
      });
    } else {
      res.status(400).send("USER_EXISTS");
    }
  });
};
