module.exports = (req, res, next) => {
  if (
    !req.files ||
    !req.body.category ||
    !req.body.title ||
    !req.body.description ||
    !req.body.content
  ) {
    return res.redirect("/admin");
  }

  next();
};
