const Post = require('../models/Post');
const Category = require('../models/Category');

//TODO - add id_user on filter to posts query

module.exports = {
  async index (req, res) {
    const user = req.userId;

    try {
      const posts = await Post.findAll({
        where: { id_user: user }  
      });

      if(!posts)
        return res.status(404).json({error: 'Cannot find posts'});

      return res.json(posts);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  },

  async store(req, res) {
    const { title, date, description, content, id_category } = req.body;
    const user = req.userId;

    try {
      const category = await Category.findByPk(id_category);

      if(!category) {
        return res.status(400).json({ error: 'Category not found' });
      }

      const post = await Post.create({ 
        title, 
        date, 
        description, 
        content, 
        id_category,
        id_user: user 
      });

      if(!post)
        return res.status(404).json({error: 'Cannot create this post'});

      return res.json(post);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  },

  async update (req, res) {
    const id = req.params.id;
    const { title, date, description, content, id_category } = req.body;

    try{
      const post = await Post.update(
        { 
          title, 
          date, 
          description, 
          content, 
          id_category 
        },
        { 
          where: {
            id
          },
          returning: true,
          plain: true 
        }
      )
  
      if(!post)
        return res.status(404).json({error: 'Cannot update this post'});

      return res.json(post);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
    
  },

  async delete (req, res) {
    const id  = req.params.id;

    try {
      const post = await Post.destroy({
        where: {
          id
        }
      });

      if(!post)
        return res.status(404).json({error: 'Cannot delete this post'});
  
      return res.json(post);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  }
};