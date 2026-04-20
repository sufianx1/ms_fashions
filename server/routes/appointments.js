const express = require('express');
const { body } = require('express-validator');
const mongoose = require('mongoose');

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

router.patch('/:id/status', auth, [body('status').isIn(['pending', 'confirmed', 'completed', 'cancelled'])], validate, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid appointment id' });
    }
    const appointmentId = new mongoose.Types.ObjectId(req.params.id);
    const updates = { status: req.body.status };
    if (req.body.status === 'confirmed') {
      updates.whatsappConfirmed = true;
      updates.confirmedAt = new Date();
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    appointment.status = updates.status;
    if (updates.whatsappConfirmed !== undefined) appointment.whatsappConfirmed = updates.whatsappConfirmed;
    if (updates.confirmedAt !== undefined) appointment.confirmedAt = updates.confirmedAt;
    await appointment.save();
    return res.json(appointment);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
