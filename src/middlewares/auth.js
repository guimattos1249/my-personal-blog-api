const { authSecret } = require('../../.env');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader)
    return res.send(401).json({ error: 'No token provided' });

  const parts = authHeader.split(' ');

  if(!parts.length === 2)
    return res.send(401).json({ error: 'Token error' });

  const [ scheme, token ] = parts;

  if(!/^Bearer$/i.test(scheme))
    return res.send(401).json({ error: 'Token malformatted' });

  jwt.verify(token, authSecret, (err, decoded) => {
    if(err) return res.status(401).send({ error: 'Token invalid' });

    req.userId = decoded.id;
    req.userName = decoded.first_name;
    req.userLastName = decoded.last_name;
    req.userEmail = decoded.email;

    return next();
  });
};