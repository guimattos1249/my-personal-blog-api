const Category = require('../models/Category');

module.exports = {
  async index (req, res) {
    const id_category = req.params.id_category;
    const user = req.userId;

    try {
      const categories = await Category.findAll({
        where: {
          id: id_category,
          id_user: user
        },
        include: [
          {association: 'posts'}, 
          {association:  'user'}
        ]
      });

      if(!categories)
        return res.status(404).json({error: 'Cannot find this post'});
      
      return res.json(categories);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
    
  }
};