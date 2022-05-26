const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  title: String,
  about: String,
  email: String,
  about: String,
  sidebar: String,
  socials: {
    facebook: String,
    instagram: String
  },
  image: String
});

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
