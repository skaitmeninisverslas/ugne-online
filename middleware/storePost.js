module.exports = (req, res, next) => {

  if (!req.files.image || !req.body.category || !req.body.title || !req.body.description || !req.body.content) {
      return res.redirect('/admin')
  }

  next()
}
