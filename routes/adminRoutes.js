import express from 'express'

import protect from '../middleware/authMiddleware.js'

import authorizeRoles from '../middleware/roleMiddleware.js'

import {
  createLabAssistant,
  createLabOwner
} from '../controllers/adminController.js'

const router = express.Router()

router.post(
  '/create-lab-assistant',
  protect,
  authorizeRoles('lab_owner'),
  createLabAssistant
)

router.post(

  '/create-lab-owner',

  protect,

  authorizeRoles('admin'),

  createLabOwner
)

export default router