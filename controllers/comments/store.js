const Comments = require('../../database/models/Comments');

module.exports = (req, res) => {
    Comments.create({comment: req.body.comment, post: req.body.post, user: req.body.user}, (error, post) => {
        res.redirect('/');
    });
}
