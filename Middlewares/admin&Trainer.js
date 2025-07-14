const jwt = require('jsonwebtoken');

const checkTrainerOrAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    const { role } = decoded;

    if (role !== 'trainer' && role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only trainers or admins can add guests.' });
    }

    next();
  } catch (err) {
    console.error('Authorization error:', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = checkTrainerOrAdmin;
