import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const resetTokens = new Map();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ error: 'User already exists' });

    const user = await User.create({ username, password });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const token = crypto.randomBytes(20).toString('hex');
    resetTokens.set(token, user._id);

    const resetLink = `http://localhost:5173/reset-password/${token}`;
    console.log('🔗 Password reset link:', resetLink);

    res.json({ message: 'Reset link generated. Check console for dev link.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const userId = resetTokens.get(token);
    if (!userId) return res.status(400).json({ error: 'Invalid or expired token' });

    const user = await User.findById(userId);
    user.password = newPassword;
    await user.save();

    resetTokens.delete(token);
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
