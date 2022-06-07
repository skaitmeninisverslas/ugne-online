module.exports = (req, res, next) => {
  req.logout(req.user, (error) => {
    if (error) return next(error);
    res.redirect("/login");
  });
};
