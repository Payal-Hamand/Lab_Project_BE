import express from 'express'

import protect from '../middleware/authMiddleware.js'

import authorizeRoles from '../middleware/roleMiddleware.js'

import {
  createLabAssistant
} from '../controllers/adminController.js'

const router = express.Router()

router.post(
  '/create-lab-assistant',
  protect,
  authorizeRoles('admin'),
  createLabAssistant
)

export default router