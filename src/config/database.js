const { PASSWORD } = require('../../.env');

module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: PASSWORD,
  database: 'my-personal-blog',
  define: {
    timestamp: true,
    underscored: true
  },
};