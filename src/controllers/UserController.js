const bcrypt = require('bcrypt-nodejs');
const User = require('../models/User');

module.exports = {
  cryptPassword (password) {
    bcrypt.hash(password, 10, function(err, hash) {
      const cryptedPassword = hash;

      console.log(cryptedPassword);

      return cryptedPassword;
    });
  },

  async store (req, res) {
    const { first_name, last_name, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);

    const cryptedPassword = bcrypt.hashSync(password, salt);
    
    try {
      const user = await User.create({
        first_name,
        last_name,
        email,
        password: cryptedPassword
      });

      if(!user)
        return res.status(400).json({ error: 'Cannot create User' });

      return res.json(user);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  }
}