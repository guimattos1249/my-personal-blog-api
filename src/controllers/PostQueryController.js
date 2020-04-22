const Post = require('../models/Post');

module.exports = {
  async indexOne (req, res) {
    const id = req.params.id;

    try {
      const posts = await Post.findOne({
        where: {
          id
        }
      });

      if(!posts)
        return res.status(404).json({error: 'Cannot find this post'});
  
      return res.json(posts);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
    
  },

  async indexByDate (req, res) {
    const date = new Date(req.params.date);
    try {
      const posts = await Post.findAll({
        where: {
          date
        }
      });

      if(!posts)
        return res.status(404).json({error: 'Cannot find this post'});
  
      return res.json(posts);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  }
};