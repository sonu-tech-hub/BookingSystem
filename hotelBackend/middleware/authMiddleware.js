// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Remove any extra spaces from the token
      token = req.headers.authorization.split(' ')[1].trim();
      
      if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        res.status(401);
        throw new Error('User not found');
      }
      
      req.user = user;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const vendor = (req, res, next) => {
  if (req.user && (req.user.role === 'vendor' || req.user.role === "admin")) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as a vendor');
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

const customer = (req, res, next) => {
  if (req.user && (req.user.role === 'customer' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as a customer');
  }
};

module.exports = { protect, vendor, admin, customer };