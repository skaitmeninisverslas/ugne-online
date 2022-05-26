const path = require('path');
const Page = require('../../database/models/Pages');

module.exports = async (req, res) => {

  if( !req.files ) {
    const postEdit = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content
    };

    Page.findByIdAndUpdate(req.params.id, postEdit, (err, post) => {
      if(!err) {
        res.redirect('/page/' + req.body.title);
      } else {console.log(err);}
    });
  } else {

    const { image } = req.files;

    image.mv(path.resolve(__dirname, '..', '..', 'client/build/images', image.name), (error) => {

      const postEdit = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        image: `/images/${image.name}`
      };

      Page.findByIdAndUpdate(req.params.id, postEdit, (err, post) => {
        if(!err) {
          res.redirect('/page/' + req.body.title);
        } else {console.log(err);}
      });
    });
  }
}
