const Category = require('../models/Category');

//TODO - add id_user on filter to posts query

module.exports = {
  async index (req, res) {
    try {
      const categories = await Category.findAll();

      if(!categories)
        return res.status(404).json({ error: 'Cannot find Categories' });

      return res.json(categories);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  },

  async store (req, res) {
    const { description } = req.body;

    try {
      const category = await Category.create({ description });

      if(!category)
        res.status(400).json({ error: 'Cannot create this Category' });

      return res.json({ 
        category ,
        user: req.userId
      });
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }    
  },

  async update (req, res) {
    const id = req.params.id;

    const { description } = req.body;

    try {
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

    try {
      const category = await Category.destroy({
        where: {
          id
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
