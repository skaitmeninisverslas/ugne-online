const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  content: String,
  image: String,
  ogimage: String,
  metitle: String,
  ogtitle: String,
  medescription: String,
  ogdescription: String,
});

const Page = mongoose.model("Page", PageSchema);

module.exports = Page;
