const Post = require('../models/Post');
const Category = require('../models/Category');

module.exports = {
  async indexJoin (req, res) {
    const id_category = req.params.id_category;

    const categories = await Category.findByPk( id_category,
      { include: { association: 'posts' }
    });

    return res.json(categories);
  },

  async index(req, res) {
    const posts = await Post.findAll();

    return res.json(posts);
  },

  async store(req, res) {
    const { title, date, description, content, id_category } = req.body;

    const category = await Category.findByPk(id_category);

    if(!category) {
      return res.status(400).json({ error: 'Category not found' });
    }

    const post = await Post.create({ 
      title, 
      date, 
      description, 
      content, 
      id_category 
    });

    return res.json(post);
  }
};