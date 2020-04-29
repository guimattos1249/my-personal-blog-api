const bcrypt = require('bcrypt-nodejs');
const TokeController = require('./TokenController');
const User = require('../models/User');

module.exports = {

  async singin (req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email
        }
      });

      if(user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err, !isMatch) {
            return res.status(401).json({ error: 'User not found!' });
          }

          res.json({
            first_name: user.first_name,
            email: user.email,
            token: TokeController.generateToken({ 
              id: user.id, 
              first_name: user.first_name,  
              last_name: user.last_name,
              email: user.email
            })
          });
        });
      } else {
        res.status(400).json({ error: 'User cannot be registered!' });
      }
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  },

  async store (req, res) {
    const { first_name, last_name, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);

    const cryptedPassword = bcrypt.hashSync(password, salt);
    
    try {
      if(await User.findOne({ where: { email } }))
        return res.status(400).json({ error: 'User Alredy exists' });


      const user = await User.create({
        first_name,
        last_name,
        email,
        password: cryptedPassword
      });

      if(!user)
        return res.status(400).json({ error: 'Cannot create User' });

      user.password = undefined;

      return res.json({
        user,
        token: TokeController.generateToken({ 
          id: user.id, 
          first_name: user.first_name,  
          last_name: user.last_name,
          email: user.email
        })
      });
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  },
}