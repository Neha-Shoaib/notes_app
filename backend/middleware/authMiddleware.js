import jsonwebtoken from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Read token from either authorization header or httpOnly cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    // Fetch user and attach to requests while excluding password property
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User reference not found' });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized, token validation failed' });
  }
};