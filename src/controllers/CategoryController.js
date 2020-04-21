const Category = require('../models/Category');

module.exports = {
  async store(req, res) {
    const { description } = req.body;

    const category = await Category.create({ description });

    return res.json(category);
  }
}