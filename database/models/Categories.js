const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: String,
});

const Categories = mongoose.model("Categories", CategorySchema);

module.exports = Categories;
