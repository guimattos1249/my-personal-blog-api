const Post = require('../models/Post');

module.exports = {
  async indexOne (req, res) {
    const id = req.params.id;

    const posts = await Post.findOne({
      where: {
        id
      }
    });

    return res.json(posts);
  },

  async indexByDate (req, res) {
    const date = new Date(req.params.date);

    const posts = await Post.findAll({
      where: {
        date
      }
    });

    return res.json(posts);
  }
};