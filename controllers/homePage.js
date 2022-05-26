const Post = require('../database/models/Post');
const Categories = require('../database/models/Categories');
const Menu = require('../database/models/Menu');
const Page = require('../database/models/Pages');
const Comments = require('../database/models/Comments');

module.exports = async (req, res) => {

    const post = await Post.find({});
    const categories = await Categories.find({});
    const menu = await Menu.find({});
    const pages = await Page.find({});
    const comments = await Comments.find({});

    return res.status(200).send({post, categories, menu, pages, comments});
}
