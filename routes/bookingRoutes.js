import express from 'express'

import protect from '../middleware/authMiddleware.js'

import upload from '../middleware/uploadMiddleware.js'

import {
  createBooking,
  getAllBookings,
  getMyBookings,
  uploadReport
} from '../controllers/bookingController.js'
import authorizeRoles from '../middleware/roleMiddleware.js'

const router = express.Router()

router.post('/', protect, createBooking)

router.get('/my-bookings', protect, getMyBookings)

router.put(

  '/upload-report/:id',

  protect,

  authorizeRoles(
    'lab_assistant',
    'admin'
  ),

  upload.single('report'),

  uploadReport
)
router.get(
  '/all',
  protect,
  authorizeRoles(
    'admin',
    'lab_assistant'
  ),
  getAllBookings
)

export default router