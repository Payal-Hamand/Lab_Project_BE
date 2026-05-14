import mongoose from 'mongoose'

import dotenv from 'dotenv'

import bcrypt from 'bcryptjs'

import User from '../models/User.js'

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

const createAdmin = async () => {

  try {

    const hashedPassword = await bcrypt.hash(
      'admin123',
      10
    )

    const adminExists = await User.findOne({
      email: 'admin@gmail.com'
    })

    if (adminExists) {

      console.log('Admin already exists')

      process.exit()
    }

    await User.create({

      name: 'Super Admin',

      email: 'admin@gmail.com',

      password: hashedPassword,

      role: 'admin'

    })

    console.log('Admin Created')

    process.exit()

  } catch (error) {

    console.log(error)

    process.exit(1)
  }
}

createAdmin()