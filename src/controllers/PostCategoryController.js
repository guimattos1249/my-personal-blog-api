const Category = require('../models/Category');

module.exports = {
  async index (req, res) {
    const id_category = req.params.id_category;

    const categories = await Category.findByPk( id_category,
      { include: { association: 'posts' }
    });

    return res.json(categories);
  }
};