import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const resetTokens = new Map();
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// new user reg
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
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

// Login an existing user
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

// Request password reset
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

// password reset
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



// import User from '../models/User.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// export const registerUser = async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required' });
//   }

//   try {
//     // Vérifier si l'utilisateur existe déjà
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Username already taken' });
//     }

//     // Hasher le mot de passe
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Créer l'utilisateur
//     const user = await User.create({ username, password: hashedPassword });

//     // Générer un token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res.status(201).json({ token });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// export const loginUser = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ error: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };
