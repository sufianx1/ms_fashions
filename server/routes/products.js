const express = require('express');
const { body } = require('express-validator');

const Product = require('../models/Product');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { collection, occasion, minPrice, maxPrice, featured } = req.query;
    const query = {};

    if (collection) query.collection = collection;
    if (occasion) query.occasions = occasion;
    if (featured !== undefined) query.featured = featured === 'true';
    if (minPrice || maxPrice) query.price = { ...(minPrice ? { $gte: Number(minPrice) } : {}), ...(maxPrice ? { $lte: Number(maxPrice) } : {}) };

    const products = await Product.find(query).sort({ createdAt: -1 });
    return res.json(products);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (error) {
    return next(error);
  }
});

router.post(
  '/',
  auth,
  [body('name').trim().notEmpty(), body('slug').trim().notEmpty(), body('price').isFloat({ min: 0 }), body('description.en').trim().notEmpty(), body('description.ur').trim().notEmpty(), body('collection').trim().notEmpty()],
  validate,
  async (req, res, next) => {
    try {
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      if (error.code === 11000) return res.status(409).json({ message: 'Slug already exists' });
      return next(error);
    }
  }
);

router.put('/:id', auth, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
