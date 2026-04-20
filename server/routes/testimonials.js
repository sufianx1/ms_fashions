const express = require('express');
const { body } = require('express-validator');

const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return res.json(testimonials);
  } catch (error) {
    return next(error);
  }
});

router.post(
  '/',
  auth,
  [body('name').trim().notEmpty(), body('quote').trim().notEmpty(), body('rating').optional().isInt({ min: 1, max: 5 })],
  validate,
  async (req, res, next) => {
    try {
      const testimonial = await Testimonial.create(req.body);
      return res.status(201).json(testimonial);
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
