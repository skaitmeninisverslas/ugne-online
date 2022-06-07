const { redirect } = require("express/lib/response");

module.exports = (req, res, next) => {
  if (
    !req.files ||
    !req.body.category ||
    !req.body.title ||
    !req.body.description ||
    !req.body.content
  ) {
    return res.status(400).send("There is no required data");
  }

  next();
};
