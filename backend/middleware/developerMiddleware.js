const jwt = require('jsonwebtoken');

const developer = (req, res, next) => {
  try {
    // Extract token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized, no token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized, invalid token format' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check if the user is a developer
    if (req.user.role !== 'developer') {
      return res.status(403).json({ message: 'Access denied. Developer access only.' });
    }

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error('❌ Token verification error:', error.message);

    // Respond with an appropriate error message based on the error
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please log in again' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token, please log in again' });
    }
    return res.status(500).json({ message: 'Internal server error during token verification' });
  }
};

module.exports = developer;