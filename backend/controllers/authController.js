import User from '../models/User.js';
import jsonwebtoken from 'jsonwebtoken';
import connectDB from '../config/db.js';
import bcrypt from 'bcryptjs';
import Otp from '../models/Otp.js';
import { sendOtpEmail } from '../utils/sendEmail.js';

const generateToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Send 6-Digit OTP to email for verification
// @route   POST /api/auth/send-otp
export const sendRegistrationOtp = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      res.status(400);
      throw new Error('Please provide an email address');
    }

    await connectDB();

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists with this email');
    }

    // Generate random 6-digit OTP
    const plainOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash the OTP before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(plainOtp, salt);

    // Remove any previous pending OTP for this email and save new one
    await Otp.deleteMany({ email });
    await Otp.create({ email, otp: hashedOtp });

    // Send email containing the plain OTP
    await sendOtpEmail(email, plainOtp);

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email',
    });
  } catch (error) {
    console.error("❌ CRASH INSIDE SEND OTP CONTROLLER:", error);
    next(error);
  }
};

// @desc    Register a new user (Verified via OTP)
// @route   POST /api/auth/register
export const registerUser = async (req, res, next) => {
  const { name, email, password, otp } = req.body;
  try {
    // Ensure DB connection is active before querying
    await connectDB();

    if (!name || !email || !password || !otp) {
      res.status(400);
      throw new Error('Please provide name, email, password, and OTP');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // 1. Verify OTP
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      res.status(400);
      throw new Error('OTP has expired or was not requested');
    }

    const isMatch = await bcrypt.compare(otp.trim(), otpRecord.otp);
    if (!isMatch) {
      res.status(400);
      throw new Error('Invalid verification code');
    }

    // 2. Create user (password hashing is handled by your User model hook)
    const user = await User.create({ name, email, password });

    if (user) {
      // 3. Clean up OTP record
      await Otp.deleteOne({ _id: otpRecord._id });

      const token = generateToken(user._id);

      // Secure Cookie configuration
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
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

    // Ensure DB connection is active before querying
    await connectDB();

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