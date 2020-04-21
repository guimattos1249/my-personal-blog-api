const Post = require('../models/Post');
const Category = require('../models/Category');

module.exports = {
  async index (req, res) {
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
  },

  async update (req, res) {
    const id = req.params.id;
    const { title, date, description, content, id_category } = req.body;

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

    return res.json(post);
  },

  async delete (req, res) {
    const id  = req.params.id;

    const post = await Post.destroy({
      where: {
        id
      }
    });

    res.json(post);
  }
};