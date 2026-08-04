import express from 'express'

import protect from '../middleware/authMiddleware.js'

import authorizeRoles from '../middleware/roleMiddleware.js'

import { getLabOwnerPaymentStats, getAdminPaymentStats} from '../controllers/PaymentStatistic.js'
const router = express.Router()

router.get(
  '/lab',
  protect,
  authorizeRoles('lab_owner'),
  getLabOwnerPaymentStats
)
 router.get(
  '/admin',
  protect,
  authorizeRoles('admin'),
  getAdminPaymentStats
)

export default router