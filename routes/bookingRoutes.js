import express from 'express'
import Booking from '../models/Booking.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

// CREATE BOOKING
router.post('/', protect, async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      user: req.user,
    })

    res.status(201).json(booking)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

// GET MY BOOKINGS
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user,
    })

    res.json(bookings)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

export default router