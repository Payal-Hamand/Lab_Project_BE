// import express from 'express'

// import protect from '../middleware/authMiddleware.js'

// import upload from '../middleware/uploadMiddleware.js'

// import {
//   createBooking,
//   getAllBookings,
//   getMyBookings,
//   uploadReport,
//   getLabOwnerBookings,
  
// } from '../controllers/bookingController.js'
// import authorizeRoles from '../middleware/roleMiddleware.js'

// const router = express.Router()

// router.post('/', protect, createBooking)

// router.get('/my-bookings', protect, getMyBookings)

// router.put(

//   '/upload-report/:id',

//   protect,

//   authorizeRoles(
//     'lab_assistant',
//     'admin'
//   ),

//   upload.single('report'),

//   uploadReport
// )
// router.get(
//   '/all',
//   protect,
//   authorizeRoles(
//     'admin',
//     'lab_assistant'
//   ),
//   getAllBookings
// )

// router.get(

//   '/lab-owner-bookings',

//   protect,

//   authorizeRoles(
//     'lab_owner'
//   ),

//   getLabOwnerBookings
// )

// export default router



import express from 'express'

const router = express.Router()

import protect from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'
import authorizeRoles from '../middleware/roleMiddleware.js'

import {

  createBooking,

  getMyBookings,

  uploadReport,

  getAllBookings,

  getLabOwnerBookings,

  assignAssistant,

  getAssignedBookings

} from '../controllers/bookingController.js'

/* -------- PATIENT -------- */

router.post(

  '/',

  protect,

  authorizeRoles('patient'),

  createBooking
)

router.get(

  '/my-bookings',

  protect,

  authorizeRoles('patient'),

  getMyBookings
)

/* -------- ADMIN -------- */

router.get(

  '/all',

  protect,

  authorizeRoles('admin', 'lab_assistant', 'lab_owner'),

  getAllBookings
)

/* -------- LAB OWNER -------- */

router.get(

  '/lab-owner',

  protect,

  authorizeRoles('lab_owner'),

  getLabOwnerBookings
)

router.put(

  '/assign-assistant',

  protect,

  authorizeRoles('lab_owner'),

  assignAssistant
)

/* -------- LAB ASSISTANT -------- */

router.get(

  '/assigned',

  protect,

  authorizeRoles(
    'lab_assistant'
  ),

  getAssignedBookings
)

router.put(

  '/upload-report/:id',

  protect,

  authorizeRoles(
    'lab_assistant'
  ),

  upload.single('report'),

  uploadReport
)

export default router