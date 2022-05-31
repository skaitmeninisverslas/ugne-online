const Categories = require("../database/models/Categories");
const Comments = require("../database/models/Comments");
const Menu = require("../database/models/Menu");
const Pages = require("../database/models/Pages");
const Post = require("../database/models/Post");
const Subscribers = require("../database/models/Subscribers");
const User = require("../database/models/User");

module.exports = async (req, res) => {
  const categories = await Categories.find({});
  const comments = await Comments.find({});
  const menu = await Menu.find({});
  const pages = await Pages.find({});
  const post = await Post.find({});
  const user = req.user;
  const authenticated = req.isAuthenticated();

  const subscriber = (authenticated && (await Subscribers.find({}))) || null;

  return res.status(200).json({
    categories,
    comments,
    menu,
    pages,
    post,
    subscriber,
    user,
    authenticated,
  });
};
