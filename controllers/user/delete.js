const User = require('../../database/models/User');

module.exports = (req, res) => {
  User.findByIdAndDelete(req.session.userId, (err, doc) => {
    if(!err) {
      res.redirect('/');
    } else {console.log(err);}
  });
}
