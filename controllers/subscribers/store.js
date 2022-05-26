const Subscribers = require('../../database/models/Subscribers');
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {

  const subscribe = req.body.subscribe;

  Subscribers.findOne({ email: subscribe }, (error, subscriber) => {
      if (subscriber) {
          // compare passwords.
          if(subscribe != subscriber.email) {
            Subscribers.create({email: subscribe}, (error, post) => {
                res.redirect('/');
            })
          } else {
            res.redirect('/')
          }
      } else {
        Subscribers.create({email: subscribe}, (error, post) => {
            res.redirect('/');
        })
        console.log(error)
      }
  })
}
