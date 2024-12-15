const jwt = require('jsonwebtoken');

const developer = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check if the user is a developer
    if (!req.user.isDeveloper) {
      return res.status(403).json({ message: 'Access denied. Developer access only.' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid or expired' });
  }
};

module.exports = developer;
