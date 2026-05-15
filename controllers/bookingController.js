import Booking from '../models/Booking.js'
import dotenv from 'dotenv'

dotenv.config()

export const createBooking = async (req, res) => {

  try {

    const {
      test,
      patientName,
      age,
      gender,
      phone,
      address,
      bookingDate,
      bookingTime
    } = req.body


    const booking = await Booking.create({

  user: req.user._id,

  test,

  patientName,

  age,

  gender,

  phone,

  address,

  bookingDate,

  bookingTime,

  reportId:
    'REP-' +
    Math.floor(
      100000 + Math.random() * 900000
    )

})

if (age < 1 || age > 99) {

  return res.status(400).json({

    message: 'Age must be between 1 and 100'

  })
}

    res.status(201).json(booking)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

export const getMyBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({
      user: req.user._id
    })
      .populate('test')
      .sort({ createdAt: -1 })

    res.status(200).json(bookings)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

export const uploadReport = async (
  req,
  res
) => {

  try {

    const booking =
      await Booking.findById(
        req.params.id
      )

    if (!booking) {

      return res.status(404).json({

        message:
          'Booking Not Found'

      })
    }

    if (!req.file) {

      return res.status(400).json({

        message:
          'No File Uploaded'

      })
    }

    // Save Cloudinary URL

    booking.report = req.file.path

    booking.status = 'Completed'

    booking.assignedLabAssistant =
      req.user._id

    await booking.save()

    res.status(200).json({

      message:
        'Report Uploaded Successfully',

      reportUrl:
        booking.report

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message:
        error.message

    })
  }
}


export const getAllBookings = async (
  req,
  res
) => {

  try {

    const bookings = await Booking.find()

      .populate('test')

      .populate('user')
      .populate(
    'assignedLabAssistant',
    'name email'
  )

      .sort({ createdAt: -1 })

    res.status(200).json(bookings)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}