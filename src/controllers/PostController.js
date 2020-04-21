const Post = require('../models/Post');

module.exports = {
  async store(req, res) {
    const { title, date, description, content, id_category } = req.body;

    const post = await Post.create({ title, date, description, content, id_category });

    return res.json(post);
  }
}