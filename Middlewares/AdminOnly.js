const jwt = require('jsonwebtoken');

const adminOnlyMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or invalid.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    
    req.user = decoded;

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = {adminOnlyMiddleware};
