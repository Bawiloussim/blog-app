import express from 'express';
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/logout', (req, res) => {
  // Ici, vous pouvez gérer la suppression du token côté client
  res.json({ message: 'Déconnecté avec succès' });
});

export default router;