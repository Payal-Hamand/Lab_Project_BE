import express from 'express'
import Test from '../models/Test.js'

const router = express.Router()

// GET ALL TESTS
router.get('/', async (req, res) => {
  try {
    const tests = await Test.find()

    res.json(tests)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

// ADD TEST
router.post('/', async (req, res) => {
  try {
    const test = await Test.create(req.body)

    res.status(201).json(test)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

export default router