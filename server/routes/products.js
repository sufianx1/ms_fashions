const express = require('express');
const { body } = require('express-validator');
const mongoose = require('mongoose');

const Product = require('../models/Product');
const { COLLECTIONS, OCCASIONS } = require('../models/Product');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { collection, occasion, minPrice, maxPrice, featured } = req.query;
    let query = Product.find();

    if (collection && COLLECTIONS.includes(collection)) query = query.where('collection').equals(collection);
    if (occasion && OCCASIONS.includes(occasion)) query = query.where('occasions').equals(occasion);
    if (featured !== undefined) query = query.where('featured').equals(featured === 'true');
    if (minPrice) query = query.where('price').gte(Number(minPrice));
    if (maxPrice) query = query.where('price').lte(Number(maxPrice));

    const products = await query.sort({ createdAt: -1 });
    return res.json(products);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product id' });
    }
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

router.put(
  '/:id',
  auth,
  [
    body('name').optional().trim().notEmpty(),
    body('slug').optional().trim().notEmpty(),
    body('price').optional().isFloat({ min: 0 }),
    body('description.en').optional().trim().notEmpty(),
    body('description.ur').optional().trim().notEmpty(),
    body('collection').optional().trim().notEmpty(),
    body('featured').optional().isBoolean(),
    body('stock').optional().isInt({ min: 0 })
  ],
  validate,
  async (req, res, next) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'Invalid product id' });
      }

      const allowed = ['name', 'slug', 'description', 'collection', 'occasions', 'price', 'images', 'videos', 'featured', 'stock'];
      const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));

      const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.json(product);
    } catch (error) {
      return next(error);
    }
  }
);

router.delete('/:id', auth, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product id' });
    }
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
