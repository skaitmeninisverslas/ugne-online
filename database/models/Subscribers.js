const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
  email: String
});

const Subscribers = mongoose.model('Subscribers', SubscriberSchema);

module.exports = Subscribers;
