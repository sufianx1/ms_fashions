const express = require('express');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');

const User = require('../models/User');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

const issueToken = (user) =>
  jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });

router.post(
  '/register',
  [
    body('name').trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('phone').trim().notEmpty(),
    body('password').isLength({ min: 8 })
  ],
  validate,
  async (req, res, next) => {
    try {
      const { name, email, phone, password } = req.body;
      const safeEmail = String(email).toLowerCase();
      const existing = await User.findOne({ email: safeEmail });
      if (existing) {
        return res.status(409).json({ message: 'Email already in use' });
      }

      const user = await User.create({ name, email: safeEmail, phone, password });
      const token = issueToken(user);
      return res.status(201).json({ token, user: { id: user._id, name, email: safeEmail, phone } });
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  '/login',
  [body('email').isEmail().normalizeEmail(), body('password').notEmpty()],
  validate,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const safeEmail = String(email).toLowerCase();
      const user = await User.findOne({ email: safeEmail }).select('+password');
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = issueToken(user);
      return res.json({
        token,
        user: { id: user._id, name: user.name, email: user.email, phone: user.phone, preferences: user.preferences }
      });
    } catch (error) {
      return next(error);
    }
  }
);

router.get('/profile', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    return next(error);
  }
});

router.put('/profile', auth, async (req, res, next) => {
  try {
    const allowed = ['name', 'phone', 'address', 'city', 'area', 'preferences'];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowed.includes(key))
    );

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    return res.json(user);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
