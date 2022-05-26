const Page = require('../../database/models/Pages');

module.exports = (req, res) => {
  Page.findByIdAndDelete(req.params.id, (err, doc) => {
    if(!err) {
      res.redirect('/admin');
    } else {res.redirect('/login')}

  });
}
