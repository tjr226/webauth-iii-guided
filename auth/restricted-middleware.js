const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  // const { username, password } = req.headers;
  const token = req.headers.authorization;

  // if (username && password) {
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
      if (err) {
        // invalid token
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        req.user = { roles: decodeToken.roles, username: decodeToken.username };
        next();
        // valid token
      }
    })
  }
};
