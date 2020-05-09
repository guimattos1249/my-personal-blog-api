const Category = require('../models/Category');

module.exports = {
  async index (req, res) {
    const user = req.userId;

    try {
      const categories = await Category.findAll({
        where: {
          id_user: user
        }
      });

      if(!categories)
        return res.status(404).json({ error: 'Cannot find Categories' });

      return res.json(categories);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  },

  async indexById (req, res) {
    const id = req.params.id;
    const user = req.userId;

    try {
      const category = await Category.findOne({
        where: {
          id: id,
          id_user: user
        }
      });

      if(!category)
        return res.status(404).json({ error: 'Cannot find Category' });

      return res.json(category);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  },

  async store (req, res) {
    const { description } = req.body;
    const user = req.userId;

    try {
      const category = await Category.create({ 
        description,
        id_user: user
      });

      if(!category)
        res.status(400).json({ error: 'Cannot create this Category' });

      return res.json({ 
        category
      });
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }    
  },

  async update (req, res) {
    const id = req.params.id;
    const user = req.userId;

    const { description } = req.body;

    try {
      await Category.update({
        description
      }, 
      {
        where: {
          id,
          id_user: user
        },
        returning: true,
        plain: true 
      });
  
      const category = await Category.findOne({
        where: {
          id
        }
      });

      if(!category)
        return res.status(400).json({ error: 'Cannot update this Category' });
  
      return res.json(category);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  },

  async delete (req, res) {
    const id = req.params.id;
    const user = req.userId;

    try {
      const category = await Category.destroy({
        where: {
          id,
          id_user: user
        }
      });

      if(!category)
        return res.status(400).json({ error: 'Cannot delete this Category' });
  
      return res.json(category);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  }
};
