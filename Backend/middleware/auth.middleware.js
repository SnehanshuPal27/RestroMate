import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const isManager = (req, res, next) => {
  if (req.userRole !== 'Manager') {
    return res.status(403).send({ message: 'Require Manager Role!' });
  }
  next();
};

const isServer = (req, res, next) => {
  if (req.userRole !== 'Server') {
    return res.status(403).send({ message: 'Require Server Role!' });
  }
  next();
};

const isChef = (req, res, next) => {
  if (req.userRole !== 'Chef') {
    return res.status(403).send({ message: 'Require Chef Role!' });
  }
  next();
};

export { verifyToken, isManager, isServer, isChef };