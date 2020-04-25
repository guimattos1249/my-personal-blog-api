const { authSecret } = require('../../.env');
const jwt = require('jsonwebtoken');

module.exports = {
  generateToken(params = {}) {
    return jwt.sign(params, authSecret, {
      expiresIn: 86400
    });
  }
}