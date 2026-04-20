const express = require('express');
const Stripe = require('stripe');
const { body } = require('express-validator');
const mongoose = require('mongoose');

const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

router.post(
  '/',
  auth,
  [
    body('items').isArray({ min: 1 }),
    body('items.*.productId').isMongoId(),
    body('items.*.quantity').isInt({ min: 1 }),
    body('paymentMethod').isIn(['stripe', 'jazzcash']),
    body('shippingAddress.address').trim().notEmpty(),
    body('shippingAddress.city').trim().notEmpty(),
    body('shippingAddress.area').trim().notEmpty()
  ],
  validate,
  async (req, res, next) => {
    try {
      const { items, paymentMethod, shippingAddress } = req.body;
      const productIds = items.map((item) => item.productId).filter((id) => mongoose.isValidObjectId(id));
      if (productIds.length !== items.length) {
        return res.status(400).json({ message: 'Invalid product id in cart' });
      }
      const products = await Product.find({ _id: { $in: productIds } });

      const normalizedItems = items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) {
          const error = new Error('Invalid product in cart');
          error.status = 400;
          throw error;
        }
        return {
          productId: product.id,
          quantity: item.quantity,
          unitPrice: product.price
        };
      });

      const subtotal = normalizedItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
      const shippingFee = subtotal > 20000 ? 0 : 500;
      const totalAmount = subtotal + shippingFee;

      const order = await Order.create({
        userId: req.user.id,
        items: normalizedItems,
        subtotal,
        shippingFee,
        totalAmount,
        paymentMethod,
        shippingAddress
      });

      return res.status(201).json(order);
    } catch (error) {
      return next(error);
    }
  }
);

router.get('/', auth, async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user.id };
    const orders = await Order.find(query).populate('items.productId').sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    return next(error);
  }
});

router.patch(
  '/:id/status',
  auth,
  [
    body('orderStatus').optional().isIn(['pending', 'processing', 'completed', 'cancelled']),
    body('paymentStatus').optional().isIn(['pending', 'completed', 'failed', 'refunded'])
  ],
  validate,
  async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid order id' });
    }
    const orderId = new mongoose.Types.ObjectId(req.params.id);
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (req.body.orderStatus) order.orderStatus = req.body.orderStatus;
    if (req.body.paymentStatus) order.paymentStatus = req.body.paymentStatus;
    await order.save();
    return res.json(order);
  } catch (error) {
    return next(error);
  }
});

router.post('/:id/refund', auth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid order id' });
    }
    const orderId = new mongoose.Types.ObjectId(req.params.id);
    const order = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus: 'refunded', orderStatus: 'cancelled' },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    return res.json(order);
  } catch (error) {
    return next(error);
  }
});

router.post('/payments/stripe/create-intent', auth, async (req, res, next) => {
  try {
    if (!stripe) {
      return res.status(503).json({ message: 'Stripe not configured' });
    }

    const { amount, currency = 'pkr' } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency,
      automatic_payment_methods: { enabled: true }
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return next(error);
  }
});

router.post('/payments/jazzcash/initiate', auth, async (req, res) => {
  return res.json({
    message: 'JazzCash initiation endpoint is available. Complete gateway integration on secure server-side callback flow.',
    status: 'pending'
  });
});

module.exports = router;
