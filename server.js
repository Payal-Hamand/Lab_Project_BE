import dotenv from 'dotenv'

dotenv.config()
import express from 'express'

import cors from 'cors'

import connectDB from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import testRoutes from './routes/testRoutes.js'
import reportRoutes from './routes/reportRoutes.js'
import packageRoutes from './routes/packageRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import adminSetupRoute from './routes/adminSetupRoute.js'
import userRoutes from './routes/userRoutes.js'

connectDB()

const app = express()

app.use(

  cors({

    origin: [

      'http://localhost:5173',

      'http://127.0.0.1:5173',
      'https://labtest-cyan.vercel.app'

    ],

    credentials: true

  })

)


app.use(express.json())

// ROUTES
app.use('/api/setup', adminSetupRoute)
app.use('/api/auth', authRoutes)

app.use('/api/tests', testRoutes)

app.use('/api/bookings', bookingRoutes)
app.use(
  '/api/users',
  userRoutes
)


app.use('/api/reports', reportRoutes)
app.use('/api/packages', packageRoutes)
app.use('/api/admin', adminRoutes)
app.get('/', (req, res) => {
  res.send('API Running...')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`)
})