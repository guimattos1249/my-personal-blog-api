const Category = require('../models/Category');

module.exports = {
  async index (req, res) {
    const categories = await Category.findAll();

    return res.json(categories);
  },

  async store (req, res) {
    const { description } = req.body;

    const category = await Category.create({ description });

    return res.json(category);
  },

  async update (req, res) {
    const id = req.params.id;

    const { description } = req.body;

    await Category.update({
      description
    }, 
    {
      where: {
        id
      },
      returning: true,
      plain: true 
    });

    const category = await Category.findOne({
      where: {
        id
      }
    });

    return res.json(category);
  },

  async delete (req, res) {
    const id = req.params.id;

    const category = await Category.destroy({
      where: {
        id
      }
    });

    return res.json(category);
  }
};
