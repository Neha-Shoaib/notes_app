import User from '../models/User.js';
import jsonwebtoken from 'jsonwebtoken';

const generateToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password });

    if (user) {
      const token = generateToken(user._id);

      // Secure Cookie configuration
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      return res.status(201).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data received');
    }
  } catch (error) {
    console.error("❌ CRASH INSIDE REGISTER CONTROLLER:", error);
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide an email and password');
    }

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    console.error("❌ CRASH INSIDE LOGIN CONTROLLER:", error);
    next(error);
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("❌ CRASH INSIDE ME CONTROLLER:", error);
    next(error);
  }
};