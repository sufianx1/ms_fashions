const express = require('express');
const { body } = require('express-validator');

const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.post(
  '/',
  auth,
  [
    body('preferredDate').isISO8601(),
    body('preferredTime').trim().notEmpty(),
    body('occasion').trim().notEmpty(),
    body('location.address').trim().notEmpty(),
    body('location.city').trim().notEmpty(),
    body('location.area').trim().notEmpty(),
    body('phone').trim().notEmpty()
  ],
  validate,
  async (req, res, next) => {
    try {
      const appointment = await Appointment.create({ ...req.body, userId: req.user.id });
      return res.status(201).json(appointment);
    } catch (error) {
      return next(error);
    }
  }
);

router.get('/', auth, async (req, res, next) => {
  try {
    const isAdmin = req.user.role === 'admin';
    const query = isAdmin ? {} : { userId: req.user.id };
    const appointments = await Appointment.find(query).sort({ preferredDate: 1 });
    return res.json(appointments);
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id/status', auth, async (req, res, next) => {
  try {
    const updates = { status: req.body.status };
    if (req.body.status === 'confirmed') {
      updates.whatsappConfirmed = true;
      updates.confirmedAt = new Date();
    }

    const appointment = await Appointment.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    return res.json(appointment);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
