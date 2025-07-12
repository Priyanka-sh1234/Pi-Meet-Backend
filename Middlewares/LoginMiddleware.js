const jwt = require('jsonwebtoken');

const authTrainerMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');

    if (decoded.role !== 'Trainer') {
      return res.status(403).json({ message: 'Access denied: Not a trainer' });
    }

    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authTrainerMiddleware;
