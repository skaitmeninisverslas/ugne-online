const Categories = require('../../database/models/Categories');

module.exports = async (req, res) => {
    const categories = await Categories.find({});

    return res.status(200).send(categories);

}
