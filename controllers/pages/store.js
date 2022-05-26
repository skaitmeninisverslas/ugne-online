const path = require('path');
const Page = require('../../database/models/Pages');

module.exports = async (req, res) => {

  if( !req.files ) {
    const postEdit = {
      title: req.body.title,
      content: req.body.content
    };

    Page.create(postEdit, (err, post) => {
      if(!err) {
        res.redirect('/');
      } else {console.log(err);}
    });
  } else {

    const { image } = req.files;

    image.mv(path.resolve(__dirname, '..', '..', 'client/public/images', image.name), async (error) => {

      const postEdit = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        image: `/images/${image.name}`
      };

      Page.create(postEdit, (err, post) => {
        if(!err) {
          res.redirect('/');
        } else {console.log(err);}
      });
    });
  }
}
