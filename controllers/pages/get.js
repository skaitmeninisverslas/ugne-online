const Pages = require("../../database/models/Pages");

module.exports = async (req, res) => {
  const pages = await Pages.find({});

  return res.status(200).json({
    pages,
  });
};
