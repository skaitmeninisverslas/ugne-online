module.exports = (req, res, next) => {
  if (!req.body.title) {
      return res.redirect('/admin')
  }

  next()
}
